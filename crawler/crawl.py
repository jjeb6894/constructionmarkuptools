from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import re
import time
from collections import defaultdict, deque
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from urllib.parse import urldefrag, urljoin, urlparse
from urllib.robotparser import RobotFileParser

import requests
import yaml
from bs4 import BeautifulSoup


@dataclass
class CrawlRecord:
    source_domain: str
    source_url: str
    final_url: str
    canonical_url: str
    http_status: int | None
    robots_allowed: bool
    raw_path: str | None
    content_hash: str | None
    discovered_links: list[str]
    asset_links: list[dict]
    crawl_timestamp: str
    notes: str = ""


class PoliteCrawler:
    def __init__(self, config: dict):
        self.config = config
        self.user_agent = config["user_agent"]
        self.timeout = int(config.get("timeout_seconds", 20))
        self.default_delay = float(config.get("default_rate_limit_seconds", 1.0))
        self.max_pages_per_domain = int(config.get("max_pages_per_domain", 8))
        self.max_depth = int(config.get("max_depth", 1))
        self.raw_dir = Path(config.get("raw_dir", "data/raw"))
        self.raw_dir.mkdir(parents=True, exist_ok=True)
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": self.user_agent, "Accept": "text/html,application/xhtml+xml"})
        self.robots: dict[str, RobotFileParser] = {}
        self.last_request_at: dict[str, float] = defaultdict(float)
        self.domain_counts: dict[str, int] = defaultdict(int)
        self.seen_urls: set[str] = set()
        self.seen_canonicals: dict[str, str] = {}
        self.seen_hashes: dict[str, str] = {}

    def get_robots(self, url: str) -> RobotFileParser:
        parsed = urlparse(url)
        base = f"{parsed.scheme}://{parsed.netloc}"
        if base in self.robots:
            return self.robots[base]
        rp = RobotFileParser()
        rp.set_url(urljoin(base, "/robots.txt"))
        try:
            rp.read()
        except Exception:
            # Conservative fallback: if robots cannot be fetched, allow only seed URL checks through robotparser default.
            pass
        self.robots[base] = rp
        return rp

    def allowed_by_robots(self, url: str) -> bool:
        try:
            return self.get_robots(url).can_fetch(self.user_agent, url)
        except Exception:
            return False

    def throttle(self, domain: str) -> None:
        elapsed = time.time() - self.last_request_at[domain]
        if elapsed < self.default_delay:
            time.sleep(self.default_delay - elapsed)
        self.last_request_at[domain] = time.time()

    def should_skip_url(self, url: str) -> bool:
        parsed = urlparse(url)
        path_lower = parsed.path.lower()
        full_lower = url.lower()
        if parsed.scheme not in {"http", "https"}:
            return True
        if any(path_lower.endswith(ext) for ext in self.config.get("skip_extensions", [])):
            return True
        return any(fragment in full_lower for fragment in self.config.get("blocked_url_fragments", []))

    def relevant_link(self, url: str, source_domain: str) -> bool:
        parsed = urlparse(url)
        if parsed.netloc.lower() != source_domain.lower():
            return False
        text = url.lower()
        patterns = self.config.get("allowed_url_patterns", [])
        return not patterns or any(pattern in text for pattern in patterns)

    def discover_sitemap_urls(self, seed: str) -> list[str]:
        parsed = urlparse(seed)
        sitemap = f"{parsed.scheme}://{parsed.netloc}/sitemap.xml"
        if not self.allowed_by_robots(sitemap):
            return []
        self.throttle(parsed.netloc)
        try:
            resp = self.session.get(sitemap, timeout=self.timeout)
            if resp.status_code >= 400 or "xml" not in resp.headers.get("content-type", "").lower():
                return []
            soup = BeautifulSoup(resp.text, "xml")
            urls = [loc.get_text(strip=True) for loc in soup.find_all("loc")]
            return [u for u in urls if self.relevant_link(u, parsed.netloc)][: self.max_pages_per_domain]
        except Exception:
            return []

    def fetch(self, url: str) -> CrawlRecord:
        clean_url = urldefrag(url)[0]
        parsed = urlparse(clean_url)
        timestamp = datetime.now(timezone.utc).isoformat()
        if self.should_skip_url(clean_url):
            return CrawlRecord(parsed.netloc, clean_url, clean_url, clean_url, None, False, None, None, [], [], timestamp, "skipped blocked or downloadable URL")
        robots_allowed = self.allowed_by_robots(clean_url)
        if not robots_allowed:
            return CrawlRecord(parsed.netloc, clean_url, clean_url, clean_url, None, False, None, None, [], [], timestamp, "blocked by robots.txt")
        self.throttle(parsed.netloc)
        try:
            resp = self.session.get(clean_url, timeout=self.timeout, allow_redirects=True)
        except Exception as exc:
            return CrawlRecord(parsed.netloc, clean_url, clean_url, clean_url, None, robots_allowed, None, None, [], [], timestamp, f"request failed: {exc}")
        final_url = urldefrag(resp.url)[0]
        content_type = resp.headers.get("content-type", "").lower()
        if "text/html" not in content_type and "application/xhtml" not in content_type:
            return CrawlRecord(parsed.netloc, clean_url, final_url, final_url, resp.status_code, robots_allowed, None, None, [], [], timestamp, f"non-html content-type: {content_type}")

        text = resp.text
        soup = BeautifulSoup(text, "html5lib")
        canonical_tag = soup.find("link", rel=lambda v: v and "canonical" in v)
        canonical_url = urljoin(final_url, canonical_tag.get("href", "")) if canonical_tag and canonical_tag.get("href") else final_url
        canonical_url = urldefrag(canonical_url)[0]
        content_hash = hashlib.sha256(soup.get_text(" ", strip=True).encode("utf-8", errors="ignore")).hexdigest()

        raw_path = None
        if self.config.get("store_raw_html", True):
            domain_dir = self.raw_dir / parsed.netloc.replace(":", "_")
            domain_dir.mkdir(parents=True, exist_ok=True)
            filename = hashlib.sha256(final_url.encode()).hexdigest()[:16] + ".html"
            raw_file = domain_dir / filename
            raw_file.write_text(text, encoding="utf-8", errors="ignore")
            raw_path = str(raw_file)

        links, assets = self.extract_links(soup, final_url, parsed.netloc)
        return CrawlRecord(parsed.netloc, clean_url, final_url, canonical_url, resp.status_code, robots_allowed, raw_path, content_hash, links, assets, timestamp)

    def extract_links(self, soup: BeautifulSoup, base_url: str, source_domain: str) -> tuple[list[str], list[dict]]:
        links: list[str] = []
        assets: list[dict] = []
        skip_ext = tuple(self.config.get("skip_extensions", []))
        for a in soup.find_all("a", href=True):
            href = urldefrag(urljoin(base_url, a["href"]))[0]
            path = urlparse(href).path
            anchor = a.get_text(" ", strip=True)[:180]
            if path.lower().endswith(skip_ext):
                ext = os.path.splitext(path)[1].lower()
                assets.append({
                    "url": href,
                    "filename": os.path.basename(path),
                    "extension": ext,
                    "anchor_text": anchor,
                    "file_type": ext.lstrip("."),
                    "visible_context": a.parent.get_text(" ", strip=True)[:300] if a.parent else anchor,
                    "appears_free_or_paid": infer_free_paid(anchor + " " + href),
                })
            elif not self.should_skip_url(href) and self.relevant_link(href, source_domain):
                links.append(href)
        return sorted(set(links)), assets

    def crawl(self, seeds: Iterable[str]) -> list[CrawlRecord]:
        queue: deque[tuple[str, int]] = deque()
        for seed in seeds:
            queue.append((seed, 0))
            for sitemap_url in self.discover_sitemap_urls(seed):
                queue.append((sitemap_url, 1))

        records: list[CrawlRecord] = []
        while queue:
            url, depth = queue.popleft()
            clean_url = urldefrag(url)[0]
            if clean_url in self.seen_urls:
                continue
            domain = urlparse(clean_url).netloc
            if self.domain_counts[domain] >= self.max_pages_per_domain:
                continue
            self.seen_urls.add(clean_url)
            record = self.fetch(clean_url)
            records.append(record)
            if record.http_status and record.http_status < 400:
                duplicate_note = []
                if record.canonical_url in self.seen_canonicals and self.seen_canonicals[record.canonical_url] != clean_url:
                    duplicate_note.append(f"canonical duplicate of {self.seen_canonicals[record.canonical_url]}")
                else:
                    self.seen_canonicals[record.canonical_url] = clean_url
                if record.content_hash and record.content_hash in self.seen_hashes:
                    duplicate_note.append(f"content duplicate of {self.seen_hashes[record.content_hash]}")
                elif record.content_hash:
                    self.seen_hashes[record.content_hash] = clean_url
                if duplicate_note:
                    record.notes = "; ".join(duplicate_note)
                self.domain_counts[domain] += 1
                if depth < self.max_depth:
                    for link in record.discovered_links:
                        queue.append((link, depth + 1))
        return records


def infer_free_paid(text: str) -> str:
    lower = text.lower()
    if any(word in lower for word in ["free", "sample", "$0", "download"]):
        return "appears_free"
    if any(word in lower for word in ["cart", "buy", "price", "$", "sale"]):
        return "appears_paid"
    return "unknown"


def write_outputs(records: list[CrawlRecord], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    with (out_dir / "crawl_manifest.jsonl").open("w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r.__dict__, ensure_ascii=True) + "\n")
    with (out_dir / "asset_links.csv").open("w", newline="", encoding="utf-8") as f:
        fields = ["source_url", "url", "filename", "extension", "anchor_text", "file_type", "visible_context", "appears_free_or_paid"]
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        for r in records:
            for asset in r.asset_links:
                writer.writerow({"source_url": r.source_url, **asset})


def load_config(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", default="crawler/config.yaml")
    args = parser.parse_args()
    config = load_config(args.config)
    crawler = PoliteCrawler(config)
    records = crawler.crawl(config["seed_urls"])
    write_outputs(records, Path(config.get("processed_dir", "data/processed")))
    print(f"Crawled/recorded {len(records)} URL attempts across {len(crawler.domain_counts)} domains.")


if __name__ == "__main__":
    main()
