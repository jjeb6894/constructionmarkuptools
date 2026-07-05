# Construction Markup Tools Competitive Intelligence System

This workspace contains an ethical public-web research pipeline and static site scaffold for `constructionmarkuptools.com`.

The goal is market mapping, SEO planning, product strategy, and original page generation. It must not clone, copy, republish, or closely paraphrase competitor text, downloadable files, product files, symbols, images, layouts, or paid resources.

## Install

```bash
pip install -r requirements.txt
```

If you use the bundled Codex runtime on this machine:

```powershell
& "C:\Users\jjeb8\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m pip install -r requirements.txt
```

## Run crawl

```bash
python crawler/crawl.py --config crawler/config.yaml
```

## Run extraction

```bash
python crawler/extract.py --input data/raw --output data/processed
```

Note: this implementation reads `data/processed/crawl_manifest.jsonl`, which is written by the crawl step. The `--input` flag is kept for compatibility with the requested command shape.

## Run Ollama enrichment

Create `.env` from `.env.example`, then run:

```bash
python crawler/ollama_enrich.py --input data/processed --output data/enriched
```

Expected defaults:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b-instruct
OLLAMA_EMBED_MODEL=nomic-embed-text
```

Ollama prompts request strict JSON, include `source_url`, avoid copied phrases, mark unknown values as `null`, and include confidence fields. If Ollama is offline, deterministic extraction still works.

## Rewrite content with Ollama

This is a RAG/prompted rewrite workflow, not competitor-copy fine-tuning. It uses Google-aligned writing rules, structured research, and original product strategy while blocking copied competitor language.

```bash
python crawler/rewrite_with_ollama.py --content site/src/content --rules knowledge/google_seo_writer_rules.md --output-report reports/ollama_rewrite_report.md
```

For a quick test:

```bash
python crawler/rewrite_with_ollama.py --limit 1
```

Failed AI drafts are saved under `work/ollama_rewrite_candidates` and are not applied unless they pass QA checks or you explicitly use `--force`. See `reports/ollama_writer_operating_guide.md`.

## Generate site content

```bash
python crawler/generate_content.py --input data/enriched --output site/src/content
```

## Validate

```bash
python crawler/validate.py --data data --content site/src/content --output reports/validation_report.md
```

## Build site

```bash
cd site
npm install
npm run build
```

On this Codex desktop environment, use the bundled package manager if Node is not on PATH:

```powershell
cd site
& "C:\Users\jjeb8\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd" install
& "C:\Users\jjeb8\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd" build
```

## Outputs

- `data/pages.csv`
- `data/products.csv`
- `data/taxonomy.json`
- `data/seo_keywords.csv`
- `data/competitor_matrix.csv`
- `data/content_gaps.md`
- `data/processed/crawl_manifest.jsonl`
- `data/processed/asset_links.csv`
- `reports/competitor_report.md`
- `reports/seo_plan.md`
- `reports/product_roadmap.md`
- `reports/site_architecture.md`
- `reports/content_briefs.md`
- `reports/validation_report.md`
- `site/src/content/pages/*.md`
- `site/src/content/products/*.md`

## Legal and Ethical Crawling Notes

- The crawler checks `robots.txt` before every fetch.
- It uses a clear user agent and a configurable per-domain delay.
- It records downloadable asset metadata only; it does not download `.btx`, `.zip`, PDFs, product files, or gated resources.
- It skips checkout, cart, account, login, CAPTCHA, and challenge-like URLs.
- It stores raw HTML locally for audit only. Raw HTML is not publishable site content.
- Generated pages use original wording and planned product information, not competitor claims as if they were our own.
- Every competitor insight should retain traceability to `source_url`.
- Manual review is still required before commercial launch.

## Next Manual Research Needed

- Verify current Bluebeam/Revu compatibility requirements for each final product.
- Manually review competitor pricing where robots or anti-bot systems limit automated access.
- Create original symbol assets and downloadable `.btx` files.
- Define exact licence terms, refund policy, support SLA, and team/company seat rules.
- Validate final generated copy for originality before publication.
- Add real screenshots of original products once they exist.
- Run Lighthouse and accessibility checks after final design implementation.
