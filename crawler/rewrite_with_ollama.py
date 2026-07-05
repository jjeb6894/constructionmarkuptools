from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path

from ollama_client import OllamaClient


DISCLAIMER = "Bluebeam and Revu are trademarks of their respective owners. Construction Markup Tools is not affiliated with or endorsed by Bluebeam, Inc."


def read_csv(path: Path) -> list[dict]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore") if path.exists() else ""


def parse_frontmatter(markdown: str) -> tuple[str, str]:
    if markdown.startswith("---"):
        end = markdown.find("\n---", 3)
        if end != -1:
            return markdown[: end + 4], markdown[end + 4 :].lstrip()
    return "", markdown


def slug_from_url(url: str) -> str:
    return url.strip("/") or "index"


def evidence_for_page(source_url: str, seo_rows: list[dict], product_rows: list[dict], competitor_rows: list[dict]) -> dict:
    slug = slug_from_url(source_url)
    related_keywords = [r for r in seo_rows if slug_from_url(r.get("recommended_url", "")) == slug]
    page_target = related_keywords[0].get("page_target", "") if related_keywords else ""
    related_products = [
        {
            "source_domain": p.get("source_domain"),
            "source_url": p.get("source_url"),
            "product_category": p.get("product_category"),
            "discipline": p.get("discipline"),
            "price": (p.get("currency", "") + p.get("price", "")).strip(),
            "file_types_mentioned": p.get("file_types_mentioned"),
        }
        for p in product_rows
        if page_target and page_target.lower() in (p.get("discipline", "") + " " + p.get("product_category", "")).lower()
    ][:8]
    return {
        "page_url": source_url,
        "recommended_keywords": related_keywords[:8],
        "neutral_market_signals": related_products,
        "competitor_domains_seen": [r.get("domain") for r in competitor_rows[:12]],
    }


def prompt_for_page(rules: str, frontmatter: str, current_body: str, evidence: dict, page_kind: str) -> str:
    compact_rules = "\n".join(
        line for line in rules.splitlines()
        if line.startswith("#") or line.startswith("-") or re.match(r"^\d+\.", line)
    )
    return f"""You are the local SEO content writer for constructionmarkuptools.com.

You are NOT fine-tuning and you are NOT allowed to copy competitors.
Use competitor research only as neutral market evidence. Do not reuse competitor phrases, claims, layouts, headings, product files, symbols, images, or paid content.

Follow these Google-aligned writing rules:
{compact_rules[:1800]}

Page kind: {page_kind}
Existing frontmatter to preserve exactly:
{frontmatter}

Current draft to improve:
{current_body[:1800]}

Structured research evidence. Treat as internal context only; do not publish competitor URLs in the public page body:
{json.dumps(evidence, indent=2, ensure_ascii=False)[:1000]}

Rewrite the page as a concise complete Markdown body only, without frontmatter.

Requirements:
- UK English.
- Practical construction professional audience.
- Original wording.
- Stronger commercial usefulness than the current draft.
- Do not include a public "Research evidence" section.
- Do not invent exact symbol counts, customer reviews, ratings, endorsements, or compatibility guarantees.
- Make clear that Bluebeam Revu is required and not included.
- Include the exact disclaimer once.
- Include useful internal links.
- Include a section exactly titled `## FAQs` with at least four `###` question headings and answers.
- Include schema implementation notes, but keep them concise.
- Keep it publishable and helpful, not keyword-stuffed.
- Aim for 700-1000 words unless the source page requires less.
"""


def ollama_stream_generate(client: OllamaClient, prompt: str, timeout: int, max_tokens: int) -> str:
    import requests

    payload = {
        "model": client.model,
        "prompt": prompt,
        "stream": True,
        "options": {"temperature": 0.2, "num_ctx": 8000, "num_predict": max_tokens},
    }
    chunks: list[str] = []
    with requests.post(f"{client.base_url}/api/generate", json=payload, timeout=timeout, stream=True) as response:
        response.raise_for_status()
        for line in response.iter_lines(decode_unicode=True):
            if not line:
                continue
            data = json.loads(line)
            chunks.append(data.get("response", ""))
            if data.get("done"):
                break
    return "".join(chunks)


def quality_score(markdown: str) -> dict:
    text = re.sub(r"\s+", " ", markdown)
    required = {
        "disclaimer": DISCLAIMER in markdown,
        "bluebeam_required": bool(re.search(r"Bluebeam Revu is required|requires Bluebeam Revu", markdown, re.I)),
        "faq": "## FAQs" in markdown and markdown.count("### ") >= 3,
        "compatibility": "## Compatibility" in markdown,
        "licence": "## Licence" in markdown or "## Licence and usage" in markdown,
        "sample_cta": "free sample" in text.lower(),
        "no_research_evidence_section": "## Research evidence" not in markdown,
        "no_competitor_urls": not re.search(r"https?://(www\.)?(markuptoolsets|simpletechresources|bim-depot|bbtoolsets|etsy|axis|avigilon|pelco|hanwhavision)", markdown, re.I),
        "no_prompt_leakage": not any(term in markdown.lower() for term in ["page-level requirements", "follow these", "structured research evidence", "current draft to improve"]),
    }
    return {"passed": all(required.values()), "checks": required, "word_count": len(text.split())}


def rewrite_file(client: OllamaClient, rules: str, path: Path, evidence: dict, page_kind: str, dry_run: bool, timeout: int, max_tokens: int, force: bool) -> dict:
    original = read_text(path)
    frontmatter, body = parse_frontmatter(original)
    prompt = prompt_for_page(rules, frontmatter, body, evidence, page_kind)
    rewritten_body = ollama_stream_generate(client, prompt, timeout, max_tokens).strip()
    rewritten_body = rewritten_body.replace("```markdown", "").replace("```", "").strip()
    if DISCLAIMER not in rewritten_body:
        rewritten_body += f"\n\n{DISCLAIMER}\n"
    output = f"{frontmatter}\n\n{rewritten_body}\n" if frontmatter else rewritten_body + "\n"
    score = quality_score(output)
    candidate_dir = Path("work/ollama_rewrite_candidates")
    candidate_dir.mkdir(parents=True, exist_ok=True)
    (candidate_dir / path.name).write_text(output, encoding="utf-8")
    if not dry_run and (score["passed"] or force):
        path.write_text(output, encoding="utf-8")
    score["applied"] = (not dry_run and (score["passed"] or force))
    return {"file": str(path), **score}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--content", default="site/src/content")
    parser.add_argument("--rules", default="knowledge/google_seo_writer_rules.md")
    parser.add_argument("--output-report", default="reports/ollama_rewrite_report.md")
    parser.add_argument("--limit", type=int, default=0, help="0 means all files")
    parser.add_argument("--timeout", type=int, default=900)
    parser.add_argument("--model", default="")
    parser.add_argument("--max-tokens", type=int, default=1000)
    parser.add_argument("--match", default="", help="Only rewrite files whose path contains this text")
    parser.add_argument("--force", action="store_true", help="Apply even if QA checks fail")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    client = OllamaClient.from_env()
    if args.model:
        client.model = args.model
    if not client.available():
        raise SystemExit("Ollama is not reachable. Start it with: ollama serve")

    rules = read_text(Path(args.rules))
    seo_rows = read_csv(Path("data/seo_keywords.csv"))
    product_rows = read_csv(Path("data/products.csv"))
    competitor_rows = read_csv(Path("data/competitor_matrix.csv"))

    files = sorted(Path(args.content).glob("pages/*.md")) + sorted(Path(args.content).glob("products/*.md"))
    if args.match:
        files = [path for path in files if args.match.lower() in str(path).lower()]
    if args.limit:
        files = files[: args.limit]

    results = []
    for path in files:
        markdown = read_text(path)
        frontmatter, _ = parse_frontmatter(markdown)
        url_match = re.search(r'url:\s*"([^"]+)"', frontmatter)
        url = url_match.group(1) if url_match else "/" + path.stem + "/"
        page_kind = "product" if "\\products\\" in str(path) or "/products/" in str(path).replace("\\", "/") else "page"
        evidence = evidence_for_page(url, seo_rows, product_rows, competitor_rows)
        print(f"Rewriting {path} ...", flush=True)
        results.append(rewrite_file(client, rules, path, evidence, page_kind, args.dry_run, args.timeout, args.max_tokens, args.force))

    lines = ["# Ollama Rewrite Report", ""]
    lines.append("This is a prompt/RAG rewrite workflow, not competitor-copy fine-tuning.")
    lines.append("")
    for result in results:
        lines.append(f"## {result['file']}")
        lines.append(f"- Passed: {result['passed']}")
        lines.append(f"- Applied: {result['applied']}")
        lines.append(f"- Word count: {result['word_count']}")
        for key, value in result["checks"].items():
            lines.append(f"- {key}: {value}")
        lines.append("")
    Path(args.output_report).write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {args.output_report}")


if __name__ == "__main__":
    main()
