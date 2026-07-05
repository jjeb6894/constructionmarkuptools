from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path


DISCLAIMER = "Bluebeam and Revu are trademarks of their respective owners. Construction Markup Tools is not affiliated with or endorsed by Bluebeam, Inc."

PRODUCTS = [
    ("Electrical Tool Set", "/bluebeam-electrical-tool-set/", "Electrical contractors, estimators, and design teams", ["power devices", "conduit routes", "panels", "switchgear", "lighting controls"]),
    ("Fire Alarm Symbols", "/bluebeam-fire-alarm-symbols/", "Fire alarm designers, consultants, and installers", ["notification appliances", "initiating devices", "control panels", "modules", "circuits"]),
    ("CCTV Tool Set", "/bluebeam-cctv-tool-set/", "Security consultants and surveillance system designers", ["fixed cameras", "PTZ cameras", "viewsheds", "mounts", "recording equipment"]),
    ("Security and Access Control Tool Set", "/bluebeam-security-tool-set/", "Low-voltage security and access control teams", ["card readers", "door contacts", "request-to-exit devices", "controllers", "intrusion devices"]),
    ("Access Control Symbols", "/bluebeam-access-control-symbols/", "Access control specialists documenting door hardware and credentials", ["readers", "locks", "door loops", "controllers", "credentials"]),
    ("AV and Data Symbols", "/bluebeam-av-data-symbols/", "AV, data, telecom, and low-voltage designers", ["speakers", "displays", "racks", "network outlets", "cable paths"]),
    ("Telecom Tool Set", "/bluebeam-telecom-tool-set/", "Telecom and structured cabling contractors", ["data outlets", "patch panels", "racks", "fibre routes", "copper cabling"]),
    ("Lighting Symbols", "/bluebeam-lighting-symbols/", "Electrical and lighting teams", ["fixtures", "switching", "emergency lighting", "sensors", "control zones"]),
    ("HVAC Mechanical Tool Set", "/bluebeam-hvac-mechanical-tool-set/", "Mechanical contractors and HVAC coordinators", ["diffusers", "ductwork", "equipment", "controls", "airflow notes"]),
    ("Plumbing Tool Set", "/bluebeam-plumbing-tool-set/", "Plumbing estimators and coordination teams", ["fixtures", "valves", "pipework", "risers", "equipment"]),
    ("Estimating and Takeoff Tools", "/bluebeam-estimating-takeoff-tools/", "Estimators who need repeatable markups and takeoff workflows", ["count tools", "measurement markups", "phase labels", "status stamps", "review notes"]),
    ("Free Bluebeam Symbols Sample", "/free-bluebeam-symbols-sample/", "Contractors evaluating Bluebeam symbol packs before buying", ["sample electrical symbols", "sample fire alarm symbols", "sample CCTV symbols", "import instructions"]),
]

CORE_PAGES = [
    ("/", "Construction Markup Tools", "Downloadable Bluebeam Revu Tool Sets for Construction Teams"),
    ("/bluebeam-tool-sets/", "Bluebeam Tool Sets", "Bluebeam Construction Tool Sets"),
    ("/how-to-import-bluebeam-btx-tool-set/", "How to Import a Bluebeam BTX Tool Set", "How to Import a Bluebeam BTX Tool Set"),
    ("/bluebeam-tool-set-vs-symbol-library/", "Bluebeam Tool Set vs Symbol Library", "Bluebeam Tool Set vs Symbol Library"),
    ("/best-bluebeam-tool-sets-for-contractors/", "Best Bluebeam Tool Sets for Contractors", "Best Bluebeam Tool Sets for Contractors"),
    ("/bluebeam-tool-set-faq/", "Bluebeam Tool Set FAQ", "Bluebeam Tool Set FAQ"),
    ("/support/", "Support", "Support"),
    ("/license/", "Licence", "Licence and Usage"),
    ("/compatibility/", "Compatibility", "Compatibility"),
    ("/contact/", "Contact", "Contact Construction Markup Tools"),
]


def read_csv(path: Path) -> list[dict]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def frontmatter(title: str, description: str, url: str) -> str:
    return f"---\ntitle: \"{title}\"\ndescription: \"{description}\"\nurl: \"{url}\"\n---\n\n"


def product_markdown(name: str, url: str, audience: str, inclusions: list[str], evidence: list[str]) -> str:
    title = f"{name} for Bluebeam Revu"
    body = frontmatter(title, f"Original downloadable {name.lower()} planned for practical construction markup workflows.", url)
    body += f"# {title}\n\n"
    body += f"{name} is planned as an original downloadable construction markup pack for teams that already use Bluebeam Revu. It is designed to help {audience.lower()} mark drawings faster, keep symbols consistent, and produce cleaner documentation without rebuilding common markups from scratch.\n\n"
    body += "## What's included\n\n"
    for item in inclusions:
        body += f"- Original {item} markups and symbol categories\n"
    body += "- Import guidance for Bluebeam Revu Tool Chest workflows\n- Licence notes for internal project use\n- Compatibility and support notes\n\n"
    body += "## Who this is for\n\n"
    body += f"This page is for {audience.lower()} who need a repeatable markup library for reviews, takeoffs, coordination notes, and construction documentation.\n\n"
    body += "## How it works\n\n1. Download the tool set after purchase or request the free sample pack.\n2. Import the file into Bluebeam Revu.\n3. Place, resize, label, and standardise markups across plan sheets.\n4. Use consistent symbols for takeoffs, reviews, RFIs, and handover notes.\n\n"
    body += "## Common use cases\n\n- Fast drawing reviews\n- Consistent construction markups\n- Estimating and takeoff preparation\n- Design coordination comments\n- Standardised internal workflows\n\n"
    body += "## Compatibility\n\nBluebeam Revu is required and is not included. Final compatibility should be tested against the current Revu versions before commercial release.\n\n"
    body += "## Licence and usage\n\nThe planned products should use original symbols and markups created for Construction Markup Tools. Competitor files, symbols, screenshots, and paid downloads must not be reused.\n\n"
    body += "## FAQs\n\n"
    faqs = [
        ("Is Bluebeam Revu included?", "No. Bluebeam Revu is required and must be purchased separately."),
        ("Can I try a sample first?", "Yes. The recommended strategy is to offer a free sample pack with representative original symbols."),
        ("Can my team use this on multiple projects?", "The licence page should define user, team, and company usage clearly before launch."),
        ("Are these copied from another seller?", "No. The product plan requires original symbols, original page copy, and original downloadable assets."),
    ]
    for q, a in faqs:
        body += f"### {q}\n\n{a}\n\n"
    body += "## Internal links\n\n"
    body += "- [Free sample pack](/free-bluebeam-symbols-sample/)\n- [Compatibility](/compatibility/)\n- [Licence](/license/)\n- [FAQ hub](/bluebeam-tool-set-faq/)\n\n"
    body += "## Suggested schema\n\nUse Product, FAQPage, and BreadcrumbList JSON-LD with final product price, availability, SKU, and reviewed compatibility filled in at launch.\n\n"
    if evidence:
        body += "## Research evidence\n\n"
        for source in evidence[:5]:
            body += f"- {source}\n"
        body += "\n"
    body += f"{DISCLAIMER}\n"
    return body


def page_markdown(url: str, title: str, h1: str) -> str:
    body = frontmatter(title, f"{h1} for practical Bluebeam Revu construction markup workflows.", url)
    body += f"# {h1}\n\n"
    body += "Construction Markup Tools should organise Bluebeam Revu resources by trade, buyer intent, compatibility, and workflow. The site should make it easy to compare symbol packs, download a free sample, understand licensing, and choose the right bundle without reading through generic product grids.\n\n"
    body += "## Recommended sections\n\n- Trade-led category cards\n- Free sample CTA\n- Compatibility badges\n- Bundle comparison grid\n- Practical FAQs\n- Clear licence and support links\n- Bluebeam trademark disclaimer\n\n"
    body += f"{DISCLAIMER}\n"
    return body


def product_roadmap(products: list[tuple], evidence_by_category: dict[str, list[str]]) -> str:
    lines = ["# Product Roadmap", ""]
    starter = {"Electrical Tool Set", "Fire Alarm Symbols", "CCTV Tool Set", "Security and Access Control Tool Set", "AV and Data Symbols", "Telecom Tool Set", "Free Bluebeam Symbols Sample"}
    for name, url, audience, inclusions in products:
        lines.append(f"## {name}")
        lines.append(f"- Recommended URL: {url}")
        lines.append(f"- Recommended title tag: {name} for Bluebeam Revu | Construction Markup Tools")
        lines.append(f"- H1: {name} for Bluebeam Revu")
        lines.append(f"- Product positioning: {'Starter product' if name in starter else 'Expansion product'} focused on speed, consistency, and cleaner construction documentation.")
        lines.append(f"- Target user: {audience}")
        lines.append(f"- Included symbol categories to create originally: {', '.join(inclusions)}")
        lines.append("- FAQs: Bluebeam requirement, import steps, licence scope, sample availability, support.")
        lines.append("- Schema fields: name, description, brand, offers, category, software requirements, FAQPage, BreadcrumbList.")
        lines.append("- Internal links: free sample, compatibility, licence, relevant bundle, FAQ hub.")
        lines.append("- Suggested price range based on market signals: validate manually after crawl; use low-friction starter pricing and higher bundle ARPU.")
        lines.append("- Free sample strategy: include a small original subset that proves import quality without replacing the paid pack.")
        lines.append("- Bundle strategy: cross-sell Low Voltage Pack, MEP Pack, or Full Contractor Pack where relevant.")
        if evidence_by_category.get(name):
            lines.append(f"- Evidence URLs: {', '.join(evidence_by_category[name][:3])}")
        lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="data/enriched")
    parser.add_argument("--output", default="site/src/content")
    args = parser.parse_args()
    out = Path(args.output)
    (out / "products").mkdir(parents=True, exist_ok=True)
    (out / "pages").mkdir(parents=True, exist_ok=True)
    seo = read_csv(Path("data/seo_keywords.csv"))
    evidence = {}
    for row in seo:
        key = row.get("recommended_h1", "").replace("Bluebeam ", "").replace("Tool Set", "Tool Set")
        evidence.setdefault(key, [])
        if row.get("source_evidence"):
            evidence[key].extend([x.strip() for x in row["source_evidence"].split("|") if x.strip()])
    for name, url, audience, inclusions in PRODUCTS:
        slug = url.strip("/") or "index"
        (out / "products" / f"{slug}.md").write_text(product_markdown(name, url, audience, inclusions, evidence.get(name, [])), encoding="utf-8")
    for url, title, h1 in CORE_PAGES:
        slug = "index" if url == "/" else url.strip("/")
        (out / "pages" / f"{slug}.md").write_text(page_markdown(url, title, h1), encoding="utf-8")
    Path("reports").mkdir(exist_ok=True)
    Path("reports/product_roadmap.md").write_text(product_roadmap(PRODUCTS, evidence), encoding="utf-8")
    Path("reports/site_architecture.md").write_text(site_architecture(), encoding="utf-8")
    Path("reports/seo_plan.md").write_text(seo_plan(), encoding="utf-8")
    Path("reports/content_briefs.md").write_text(content_briefs(), encoding="utf-8")
    Path("reports/competitor_report.md").write_text(competitor_report(), encoding="utf-8")
    print(f"Generated {len(PRODUCTS)} product drafts and {len(CORE_PAGES)} core page drafts.")


def site_architecture() -> str:
    return """# Site Architecture

- `/` homepage with trade navigation, free sample CTA, bundles, trust/disclaimer, and popular pages.
- `/bluebeam-tool-sets/` parent category for every construction markup pack.
- Trade money pages for electrical, fire alarm, CCTV, security/access control, AV/data, telecom, lighting, HVAC, plumbing, and estimating.
- Education pages for importing BTX files, choosing tool sets versus symbol libraries, and contractor recommendations.
- Support, licence, compatibility, contact, and FAQ pages to remove purchase friction.
"""


def seo_plan() -> str:
    return """# SEO Plan

Target long-tail commercial queries combining Bluebeam/Revu with trade terms, symbols, tool set, download, sample, and bundle modifiers. Build unique pages around buyer intent rather than duplicating competitor copy. Add Product, FAQPage, BreadcrumbList, and HowTo schema where appropriate. Validate title/meta uniqueness after each content generation run.
"""


def content_briefs() -> str:
    return """# Content Briefs

Each money page should include: practical buyer problem, what's included, who it is for, how it works, use cases, compatibility, licence, free sample CTA, bundle CTA, FAQs, schema notes, internal links, and the Bluebeam disclaimer. Copy must be original and based on planned product data rather than competitor claims.
"""


def competitor_report() -> str:
    return """# Competitor Report

Use `data/competitor_matrix.csv`, `data/products.csv`, and `data/content_gaps.md` as the source-backed competitor database. Key strategic direction: out-organise the market with trade-specific pages, explicit compatibility/licensing, free sample capture, bundle comparisons, original how-to guides, and fast static SEO pages.
"""


if __name__ == "__main__":
    main()
