# Repository Notes

This repository contains the working competitive-intelligence, content-generation, and static website system for `constructionmarkuptools.com`.

## Included

- Ethical public crawler and extractors in `crawler/`
- Google-aligned Ollama writing rules in `knowledge/`
- Structured research outputs in `data/`
- Strategy and QA reports in `reports/`
- Astro static site source in `site/`
- User-facing draft examples in `outputs/`

## Excluded

- `data/raw/` raw competitor HTML evidence
- `site/node_modules/`
- `site/dist/`
- zipped duplicate deliverables
- temporary Ollama rewrite candidates under `work/`
- `.env` files

The excluded raw evidence can be regenerated with:

```bash
python crawler/crawl.py --config crawler/config.yaml
```

## GitHub Setup

Create an empty GitHub repository named `constructionmarkuptools` or similar, then run:

```bash
git remote add origin https://github.com/YOUR-USER/constructionmarkuptools.git
git push -u origin main
```
