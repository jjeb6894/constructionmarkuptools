from __future__ import annotations

import argparse
import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup

from schemas import COMPETITOR_FIELDS, DISCIPLINE_KEYWORDS, PAGE_FIELDS, PRODUCT_FIELDS, SEO_FIELDS, TAXONOMY_KEYS


PRICE_RE = re.compile(r"(?P<currency>[$£€])\s?(?P<price>\d+(?:[.,]\d{2})?)")
SYMBOL_COUNT_RE = re.compile(r"(\d{2,5})\s+(?:symbols?|tools?|markups?|icons?)", re.I)
FILE_TYPE_RE = re.compile(r"\.(btx|zip|pdf|csv|xlsx?)\b", re.I)


def load_manifest(input_dir: Path) -> list[dict]:
    path = input_dir / "crawl_manifest.jsonl"
    if not path.exists() and input_dir.name == "raw":
        path = Path("data/processed/crawl_manifest.jsonl")
    if not path.exists():
        return []
    raw = path.read_text(encoding="utf-8")
    decoder = json.JSONDecoder()
    idx = 0
    records = []
    while idx < len(raw):
        while idx < len(raw) and raw[idx].isspace():
            idx += 1
        if idx >= len(raw):
            break
        obj, end = decoder.raw_decode(raw, idx)
        records.append(obj)
        idx = end
    return records


def soup_for(record: dict) -> BeautifulSoup | None:
    raw_path = record.get("raw_path")
    if not raw_path or not Path(raw_path).exists():
        return None
    return BeautifulSoup(Path(raw_path).read_text(encoding="utf-8", errors="ignore"), "html5lib")


def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def detect_page_type(url: str, title: str, text: str) -> str:
    blob = f"{url} {title} {text[:1500]}".lower()
    if any(word in blob for word in ["add to cart", "buy now", "regular price", "sale price", "/products/", "/product/"]):
        return "product"
    if any(word in blob for word in ["how to", "guide", "tutorial", "tips", "knowledge-base"]):
        return "guide"
    if any(word in blob for word in ["collection", "category", "market"]):
        return "category"
    if "pricing" in blob:
        return "pricing"
    if any(word in blob for word in ["free", "download"]):
        return "download/free"
    return "general"


def detect_disciplines(text: str) -> list[str]:
    lower = text.lower()
    hits = []
    for discipline, terms in DISCIPLINE_KEYWORDS.items():
        if any(term in lower for term in terms):
            hits.append(discipline)
    return hits


def meta_description(soup: BeautifulSoup) -> str:
    tag = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
    return clean_text(tag.get("content", "")) if tag else ""


def headings(soup: BeautifulSoup, tag: str) -> list[str]:
    return [clean_text(h.get_text(" ", strip=True)) for h in soup.find_all(tag) if clean_text(h.get_text(" ", strip=True))]


def extract_schema(soup: BeautifulSoup) -> list[dict]:
    out = []
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "{}")
            out.append(data)
        except Exception:
            continue
    return out


def product_name_from_schema(schema_items: list[dict]) -> str | None:
    stack = list(schema_items)
    while stack:
        item = stack.pop()
        if isinstance(item, list):
            stack.extend(item)
        elif isinstance(item, dict):
            item_type = item.get("@type")
            if item_type == "Product" or (isinstance(item_type, list) and "Product" in item_type):
                return clean_text(item.get("name", ""))
            stack.extend(v for v in item.values() if isinstance(v, (dict, list)))
    return None


def extract_product(record: dict, soup: BeautifulSoup, page_type: str, title: str, h1: str, text: str) -> dict | None:
    if page_type != "product" and not any(term in text.lower() for term in ["tool set", "toolset", "symbols", "bluebeam"]):
        return None
    schema_items = extract_schema(soup)
    name = product_name_from_schema(schema_items) or h1 or title
    price_match = PRICE_RE.search(text[:5000])
    symbol_match = SYMBOL_COUNT_RE.search(text[:5000])
    disciplines = detect_disciplines(f"{title} {h1} {text[:3000]}")
    faq_questions = [clean_text(node.get_text(" ", strip=True)) for node in soup.find_all(["h2", "h3", "summary"]) if "?" in node.get_text()]
    ctas = []
    for a in soup.find_all("a"):
        label = clean_text(a.get_text(" ", strip=True))
        if label and any(word in label.lower() for word in ["buy", "cart", "download", "learn", "free", "contact"]):
            ctas.append(label)
    return {
        "source_domain": record["source_domain"],
        "source_url": record["source_url"],
        "product_name": name[:220],
        "product_category": disciplines[0] if disciplines else "general Bluebeam workflow",
        "discipline": "; ".join(disciplines),
        "trade": "; ".join(disciplines),
        "software_context": "Bluebeam Revu" if "bluebeam" in text.lower() or "revu" in text.lower() else "",
        "price": price_match.group("price") if price_match else "",
        "currency": price_match.group("currency") if price_match else "",
        "sale_price": "",
        "number_of_symbols_claimed": symbol_match.group(1) if symbol_match else "",
        "file_types_mentioned": "; ".join(sorted(set(m.group(1).lower() for m in FILE_TYPE_RE.finditer(text[:8000])))),
        "delivery_method": "download" if "download" in text.lower() else "",
        "compatibility_claims": short_evidence(text, ["compatible", "works with", "bluebeam", "revu"]),
        "included_items_summary": short_evidence(text, ["includes", "included", "symbols", "tools"]),
        "license_notes": short_evidence(text, ["license", "licence", "terms"]),
        "refund_notes": short_evidence(text, ["refund", "return"]),
        "faq_questions": " | ".join(faq_questions[:8]),
        "trust_signals": short_evidence(text, ["review", "testimonial", "secure", "support", "guarantee"]),
        "reviews_count": "",
        "rating": "",
        "cta_text": " | ".join(dict.fromkeys(ctas[:8])),
        "source_evidence_short": clean_text(text[:350]),
    }


def short_evidence(text: str, needles: list[str]) -> str:
    sentences = re.split(r"(?<=[.!?])\s+", clean_text(text))
    hits = [s for s in sentences if any(n in s.lower() for n in needles)]
    return " ".join(hits[:2])[:450]


def write_csv(path: Path, fields: list[str], rows: list[dict]) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        for row in rows:
            writer.writerow({field: row.get(field, "") for field in fields})


def build_taxonomy(products: list[dict], pages: list[dict]) -> dict:
    taxonomy = {key: {"source_urls": [], "observed_terms": []} for key in TAXONOMY_KEYS}
    for row in products + pages:
        text = " ".join(str(v) for v in row.values()).lower()
        for key, terms in DISCIPLINE_KEYWORDS.items():
            if any(term in text for term in terms):
                taxonomy.setdefault(key, {"source_urls": [], "observed_terms": []})
                url = row.get("source_url")
                if url and url not in taxonomy[key]["source_urls"]:
                    taxonomy[key]["source_urls"].append(url)
                taxonomy[key]["observed_terms"].extend([t for t in terms if t in text])
    for key in taxonomy:
        taxonomy[key]["source_urls"] = taxonomy[key]["source_urls"][:20]
        taxonomy[key]["observed_terms"] = sorted(set(taxonomy[key]["observed_terms"]))
    return taxonomy


def build_seo_keywords(taxonomy: dict) -> list[dict]:
    page_map = {
        "electrical": ("/bluebeam-electrical-tool-set/", "Bluebeam Electrical Tool Set", "Bluebeam Electrical Tool Set"),
        "fire alarm": ("/bluebeam-fire-alarm-symbols/", "Bluebeam Fire Alarm Symbols", "Bluebeam Fire Alarm Symbols"),
        "CCTV": ("/bluebeam-cctv-tool-set/", "Bluebeam CCTV Tool Set", "Bluebeam CCTV Tool Set"),
        "access control": ("/bluebeam-access-control-symbols/", "Bluebeam Access Control Symbols", "Bluebeam Access Control Symbols"),
        "security": ("/bluebeam-security-tool-set/", "Bluebeam Security Tool Set", "Bluebeam Security Tool Set"),
        "AV/audio-visual": ("/bluebeam-av-data-symbols/", "Bluebeam AV and Data Symbols", "Bluebeam AV and Data Symbols"),
        "telecom/data": ("/bluebeam-telecom-tool-set/", "Bluebeam Telecom Tool Set", "Bluebeam Telecom Tool Set"),
        "lighting": ("/bluebeam-lighting-symbols/", "Bluebeam Lighting Symbols", "Bluebeam Lighting Symbols"),
        "HVAC/mechanical": ("/bluebeam-hvac-mechanical-tool-set/", "Bluebeam HVAC Mechanical Tool Set", "Bluebeam HVAC Mechanical Tool Set"),
        "plumbing": ("/bluebeam-plumbing-tool-set/", "Bluebeam Plumbing Tool Set", "Bluebeam Plumbing Tool Set"),
        "estimating/takeoff": ("/bluebeam-estimating-takeoff-tools/", "Bluebeam Estimating and Takeoff Tools", "Bluebeam Estimating and Takeoff Tools"),
        "free samples": ("/free-bluebeam-symbols-sample/", "Free Bluebeam Symbols Sample", "Free Bluebeam Symbols Sample"),
    }
    rows = []
    for category, target in page_map.items():
        evidence = " | ".join(taxonomy.get(category, {}).get("source_urls", [])[:3])
        base = category.replace("CCTV", "cctv").replace("AV/audio-visual", "av").replace("HVAC/mechanical", "hvac")
        for modifier, intent, stage in [
            ("bluebeam " + base + " tool set", "commercial", "consideration"),
            ("bluebeam " + base + " symbols", "commercial", "consideration"),
            ("download " + base + " bluebeam tools", "transactional", "decision"),
        ]:
            rows.append({
                "keyword": clean_text(modifier),
                "intent": intent,
                "buyer_stage": stage,
                "page_target": category,
                "difficulty_proxy": "medium" if evidence else "low",
                "commercial_value_proxy": "high" if category not in {"free samples"} else "lead-gen",
                "source_evidence": evidence,
                "recommended_url": target[0],
                "recommended_title": target[1],
                "recommended_h1": target[2],
            })
    return rows


def build_competitor_matrix(pages: list[dict], products: list[dict]) -> list[dict]:
    by_domain = defaultdict(lambda: {"pages": [], "products": []})
    for p in pages:
        by_domain[p["source_domain"]]["pages"].append(p)
    for p in products:
        by_domain[p["source_domain"]]["products"].append(p)
    rows = []
    for domain, data in sorted(by_domain.items()):
        cats = sorted(set(filter(None, (p.get("product_category") for p in data["products"]))))
        prices = [p.get("currency", "") + p.get("price", "") for p in data["products"] if p.get("price")]
        guide_pages = [p for p in data["pages"] if p.get("page_type") == "guide"]
        product_pages = [p for p in data["pages"] if p.get("page_type") == "product"]
        titles = [p.get("title") or p.get("h1") for p in data["pages"][:5]]
        has_free = any("free" in " ".join(str(v).lower() for v in p.values()) for p in data["pages"] + data["products"])
        rows.append({
            "competitor": domain.split(".")[-2] if "." in domain else domain,
            "domain": domain,
            "categories_covered": "; ".join(cats) or "unclear from crawl",
            "pricing_range": "; ".join(prices[:5]) or "not visible in crawl",
            "free_sample": "yes/mentioned" if has_free else "not observed",
            "number_of_product_pages_found": len(product_pages),
            "number_of_guide_pages_found": len(guide_pages),
            "strongest_pages": " | ".join(t for t in titles if t)[:500],
            "weaknesses": "Opportunity to improve trade-specific landing pages, FAQs, compatibility detail, schema, and bundles where not visible.",
            "opportunities_for_us": "Create clearer trade taxonomy, free sample capture, bundle comparisons, compatibility badges, and original how-to content.",
            "design_notes": "High-level review only: navigation/category cards, CTA placement, price visibility, trust signals, and mobile clarity should be benchmarked manually.",
            "seo_notes": "Use crawl titles/headings to target long-tail Bluebeam + trade + symbols/tool set queries with unique pages.",
        })
    return rows


def write_gap_report(path: Path, matrix: list[dict], taxonomy: dict) -> None:
    lines = ["# Content Gaps", ""]
    lines.append("This report uses public page metadata and short factual extraction. It is not a licence to reuse competitor copy, imagery, symbols, downloadable files, or product assets.")
    lines.append("")
    lines.append("## Market Coverage")
    for row in matrix:
        lines.append(f"- **{row['domain']}**: observed categories: {row['categories_covered']}; pricing: {row['pricing_range']}; free/sample signal: {row['free_sample']}.")
    lines.append("")
    lines.append("## Opportunity Themes")
    for item in [
        "Build clearer trade-led navigation than broad product grids.",
        "Create dedicated pages for electrical, fire alarm, CCTV, security, access control, AV/data, telecom, lighting, HVAC, plumbing, and estimating.",
        "Add original FAQs to every product page and validate FAQPage schema.",
        "Use a free sample pack as the lead magnet and route users to bundle upgrades.",
        "Publish practical how-to guides for importing .btx tool sets, organising Tool Chest items, and using PDF layers.",
        "Add compatibility, licence, refund/support, and Bluebeam trademark disclaimers in predictable page sections.",
        "Create comparison pages and bundle pages that help contractors choose quickly.",
        "Keep all product symbols and downloadable files original.",
    ]:
        lines.append(f"- {item}")
    lines.append("")
    lines.append("## Taxonomy Signals")
    for key, data in taxonomy.items():
        evidence = ", ".join(data.get("source_urls", [])[:3]) or "no direct crawl evidence yet"
        lines.append(f"- **{key}**: evidence sources: {evidence}")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="data/processed")
    parser.add_argument("--output", default="data/processed")
    args = parser.parse_args()
    input_dir = Path(args.input)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    manifest = load_manifest(input_dir)
    pages, products = [], []
    for record in manifest:
        soup = soup_for(record)
        if not soup:
            pages.append({
                "source_domain": record.get("source_domain", ""),
                "source_url": record.get("source_url", ""),
                "canonical_url": record.get("canonical_url", ""),
                "http_status": record.get("http_status", ""),
                "page_type": "blocked_or_unavailable",
                "crawl_timestamp": record.get("crawl_timestamp", ""),
                "robots_allowed": record.get("robots_allowed", ""),
                "notes": record.get("notes", ""),
            })
            continue
        title = clean_text(soup.title.get_text(" ", strip=True)) if soup.title else ""
        h1s = headings(soup, "h1")
        h2s = headings(soup, "h2")
        h3s = headings(soup, "h3")
        for tag in soup(["script", "style", "noscript", "svg"]):
            tag.extract()
        text = clean_text(soup.get_text(" ", strip=True))
        page_type = detect_page_type(record.get("source_url", ""), title, text)
        canonical_duplicate = ""
        if "canonical duplicate of" in record.get("notes", ""):
            canonical_duplicate = record["notes"].split("canonical duplicate of", 1)[1].split(";", 1)[0].strip()
        page = {
            "source_domain": record.get("source_domain", ""),
            "source_url": record.get("source_url", ""),
            "canonical_url": record.get("canonical_url", ""),
            "http_status": record.get("http_status", ""),
            "page_type": page_type,
            "title": title,
            "meta_description": meta_description(soup),
            "h1": h1s[0] if h1s else "",
            "h2_list": " | ".join(h2s[:20]),
            "h3_list": " | ".join(h3s[:20]),
            "word_count": len(text.split()),
            "detected_language": "en" if re.search(r"\b(the|and|bluebeam|tool|set)\b", text.lower()) else "",
            "crawl_timestamp": record.get("crawl_timestamp", ""),
            "robots_allowed": record.get("robots_allowed", ""),
            "canonical_duplicate_of": canonical_duplicate,
            "notes": record.get("notes", ""),
        }
        pages.append(page)
        product = extract_product(record, soup, page_type, title, page["h1"], text)
        if product:
            products.append(product)
    taxonomy = build_taxonomy(products, pages)
    seo_rows = build_seo_keywords(taxonomy)
    matrix = build_competitor_matrix(pages, products)
    write_csv(Path("data/pages.csv"), PAGE_FIELDS, pages)
    write_csv(Path("data/products.csv"), PRODUCT_FIELDS, products)
    write_csv(Path("data/seo_keywords.csv"), SEO_FIELDS, seo_rows)
    write_csv(Path("data/competitor_matrix.csv"), COMPETITOR_FIELDS, matrix)
    (Path("data/taxonomy.json")).write_text(json.dumps(taxonomy, indent=2, ensure_ascii=False), encoding="utf-8")
    write_gap_report(Path("data/content_gaps.md"), matrix, taxonomy)
    print(f"Extracted {len(pages)} pages, {len(products)} product-like pages, {len(seo_rows)} SEO keyword rows.")


if __name__ == "__main__":
    main()
