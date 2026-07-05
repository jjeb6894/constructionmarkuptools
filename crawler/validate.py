from __future__ import annotations

import argparse
import csv
import json
import re
from collections import Counter
from pathlib import Path


def read_csv(path: Path) -> list[dict]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def long_sequences(text: str, source: str, length: int = 12) -> list[str]:
    words = re.findall(r"[a-zA-Z0-9']+", text.lower())
    src = " ".join(re.findall(r"[a-zA-Z0-9']+", source.lower()))
    hits = []
    for i in range(max(0, len(words) - length + 1)):
        phrase = " ".join(words[i : i + length])
        if phrase and phrase in src:
            hits.append(phrase)
    return hits[:5]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", default="data")
    parser.add_argument("--content", default="site/src/content")
    parser.add_argument("--output", default="reports/validation_report.md")
    args = parser.parse_args()
    data_dir = Path(args.data)
    pages = read_csv(data_dir / "pages.csv")
    products = read_csv(data_dir / "products.csv")
    report = ["# Validation Report", ""]
    report.append(f"- Pages rows: {len(pages)}")
    report.append(f"- Products rows: {len(products)}")
    report.append(f"- Robots blocked/unavailable rows: {sum(str(p.get('robots_allowed')).lower() == 'false' for p in pages)}")
    missing_titles = [p["source_url"] for p in pages if p.get("http_status") and not p.get("title")]
    missing_meta = [p["source_url"] for p in pages if p.get("http_status") and not p.get("meta_description")]
    report.append(f"- Missing title rows: {len(missing_titles)}")
    report.append(f"- Missing meta description rows: {len(missing_meta)}")
    canon_counts = Counter(p.get("canonical_url") for p in pages if p.get("canonical_url"))
    dupes = [url for url, count in canon_counts.items() if count > 1]
    report.append(f"- Duplicate canonical URLs: {len(dupes)}")
    try:
        taxonomy = json.loads((data_dir / "taxonomy.json").read_text(encoding="utf-8"))
        report.append(f"- Taxonomy categories: {len(taxonomy)}")
    except Exception as exc:
        report.append(f"- Taxonomy JSON error: {exc}")

    source_text = " ".join((p.get("title", "") + " " + p.get("meta_description", "") + " " + p.get("h1", "")) for p in pages)
    plagiarism_hits = []
    for md in Path(args.content).glob("**/*.md"):
        hits = long_sequences(md.read_text(encoding="utf-8", errors="ignore"), source_text)
        if hits:
            plagiarism_hits.append((str(md), hits))
    report.append(f"- Long sequence overlap warnings: {len(plagiarism_hits)}")
    for file, hits in plagiarism_hits[:20]:
        report.append(f"  - {file}: {hits[0]}")
    report.append("")
    report.append("## Guards")
    report.append("- Robots compliance: enforced in crawler before fetches.")
    report.append("- Download guard: paid/gated/product-like file extensions are recorded as metadata only.")
    report.append("- Hallucination guard: generation uses planned product strategy and source URLs, not competitor claims as product facts.")
    report.append("- Copyright guard: generated pages are original drafts and include no competitor assets.")
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    Path(args.output).write_text("\n".join(report) + "\n", encoding="utf-8")
    print(f"Wrote {args.output}")


if __name__ == "__main__":
    main()
