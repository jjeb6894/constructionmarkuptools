from __future__ import annotations

import json
import os
from dataclasses import dataclass

import requests


def load_env(path: str = ".env") -> None:
    if not os.path.exists(path):
        return
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


@dataclass
class OllamaClient:
    base_url: str
    model: str
    embed_model: str
    timeout: int = 90

    @classmethod
    def from_env(cls) -> "OllamaClient":
        load_env()
        return cls(
            os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/"),
            os.getenv("OLLAMA_MODEL", "qwen2.5:7b-instruct"),
            os.getenv("OLLAMA_EMBED_MODEL", "nomic-embed-text"),
        )

    def available(self) -> bool:
        try:
            r = requests.get(f"{self.base_url}/api/tags", timeout=5)
            return r.ok
        except Exception:
            return False

    def generate_json(self, prompt: str, schema_hint: dict) -> dict:
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "format": "json",
            "options": {"temperature": 0.1},
        }
        r = requests.post(f"{self.base_url}/api/generate", json=payload, timeout=self.timeout)
        r.raise_for_status()
        response = r.json().get("response", "{}")
        try:
            data = json.loads(response)
        except json.JSONDecodeError:
            data = {"raw_response": response}
        for key, default in schema_hint.items():
            data.setdefault(key, default)
        return data


def strict_json_prompt(source_url: str, task: str, facts: dict, output_schema: dict) -> str:
    return f"""You are analysing public competitor metadata for lawful market research.
Return strict JSON only. Do not copy long source phrases. Summarise in original wording.
Use null for unknown values. Include confidence scores from 0 to 1.
source_url: {source_url}
task: {task}
facts_json: {json.dumps(facts, ensure_ascii=False)[:6000]}
required_output_schema: {json.dumps(output_schema, ensure_ascii=False)}
"""
