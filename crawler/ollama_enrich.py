from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path

from ollama_client import OllamaClient, strict_json_prompt


def read_csv(path: Path) -> list[dict]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="data/processed")
    parser.add_argument("--output", default="data/enriched")
    parser.add_argument("--limit", type=int, default=50)
    args = parser.parse_args()
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    pages = read_csv(Path("data/pages.csv"))
    products = read_csv(Path("data/products.csv"))
    client = OllamaClient.from_env()
    enriched = {"ollama_available": client.available(), "pages": [], "products": []}
    if not enriched["ollama_available"]:
        enriched["note"] = "Ollama service not reachable; deterministic extraction outputs remain available."
        (out / "enrichment.json").write_text(json.dumps(enriched, indent=2), encoding="utf-8")
        print(enriched["note"])
        return

    page_schema = {
        "source_url": None,
        "page_type": None,
        "neutral_summary": None,
        "seo_intent": None,
        "notable_patterns": [],
        "confidence": 0,
    }
    product_schema = {
        "source_url": None,
        "product_category": None,
        "buyer_problem": None,
        "observed_attributes": {},
        "content_gap_ideas": [],
        "confidence": 0,
    }
    for page in pages[: args.limit]:
        prompt = strict_json_prompt(page.get("source_url", ""), "classify page and summarise neutral market signals", page, page_schema)
        enriched["pages"].append(client.generate_json(prompt, page_schema))
    for product in products[: args.limit]:
        prompt = strict_json_prompt(product.get("source_url", ""), "extract product attributes and content gaps", product, product_schema)
        enriched["products"].append(client.generate_json(prompt, product_schema))
    (out / "enrichment.json").write_text(json.dumps(enriched, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote Ollama enrichment for {len(enriched['pages'])} pages and {len(enriched['products'])} products.")


if __name__ == "__main__":
    main()
