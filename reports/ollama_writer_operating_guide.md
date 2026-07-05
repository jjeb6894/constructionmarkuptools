# Ollama Writer Operating Guide

## Position

This project does not fine-tune Ollama on competitor copy. Competitor pages are copyrighted or proprietary unless specifically licensed. Training or fine-tuning on that text could create legal and originality risk.

Instead, Ollama should be used as a local writing assistant with:

- Google-aligned writing rules in `knowledge/google_seo_writer_rules.md`
- Structured market facts from `data/pages.csv`, `data/products.csv`, `data/seo_keywords.csv`, and `data/competitor_matrix.csv`
- Original product strategy from `reports/product_roadmap.md`
- Original page drafts in `site/src/content`
- QA gates in `crawler/rewrite_with_ollama.py`

## What Ollama Is Allowed To Learn From Competitors

Allowed:

- Categories covered
- Product types observed
- Visible public pricing signals
- Common buyer questions
- High-level design patterns
- Missing FAQs
- Missing compatibility detail
- Missing bundle strategy
- Missing free sample strategy
- Weak title/meta patterns

Not allowed:

- Copying competitor wording
- Close paraphrasing competitor paragraphs
- Training on raw competitor HTML as target prose
- Reusing screenshots, product files, `.btx`, `.zip`, PDFs, symbols, icons, or layouts
- Publishing competitor URLs or internal evidence sections on customer-facing pages

## Recommended Workflow

1. Crawl public pages.
2. Extract neutral facts and source URLs.
3. Generate or update briefs.
4. Ask Ollama to write from the brief, not from competitor text.
5. Save the AI draft as a candidate.
6. Run QA checks.
7. Apply only drafts that pass.
8. Manually review before publishing.

## Commands

Quick model check:

```powershell
Invoke-RestMethod -Uri 'http://localhost:11434/api/tags' -Method Get
```

Rewrite one page safely:

```powershell
$env:OLLAMA_BASE_URL='http://localhost:11434'
python crawler/rewrite_with_ollama.py --model qwen2.5:3b-instruct --match bluebeam-electrical-tool-set --max-tokens 1300
```

Rewrite priority starter products:

```powershell
python crawler/rewrite_with_ollama.py --model qwen2.5:3b-instruct --match bluebeam-fire-alarm-symbols --max-tokens 1300
python crawler/rewrite_with_ollama.py --model qwen2.5:3b-instruct --match bluebeam-cctv-tool-set --max-tokens 1300
python crawler/rewrite_with_ollama.py --model qwen2.5:3b-instruct --match bluebeam-security-tool-set --max-tokens 1300
python crawler/rewrite_with_ollama.py --model qwen2.5:3b-instruct --match bluebeam-av-data-symbols --max-tokens 1300
```

Review rejected candidates:

```powershell
Get-ChildItem work/ollama_rewrite_candidates
Get-Content reports/ollama_rewrite_report.md
```

## QA Rules

The rewrite script currently checks:

- Disclaimer present
- Bluebeam Revu requirement stated
- FAQ section present
- Compatibility section present
- Licence section present
- Free sample CTA present
- No public research evidence section
- No competitor URLs
- No prompt leakage

Failed drafts are saved in `work/ollama_rewrite_candidates` and are not applied unless `--force` is used.

## Current Finding

The first Ollama rewrite test proved the pipeline works, but the generated draft did not pass QA. The model leaked instruction-like text and missed required sections. That is why the workflow now refuses to apply failed drafts automatically.

For this domain, Ollama should be treated as a draft assistant behind strict QA, not as an unsupervised publisher.
