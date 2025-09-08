#!/usr/bin/env python3
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read_prompt(prompt_path: Path) -> str:
  return prompt_path.read_text(encoding='utf-8')


def ensure_structure():
  for rel in [
    'api', 'public/css', 'public/js', 'public/images', 'pages'
  ]:
    (ROOT / rel).mkdir(parents=True, exist_ok=True)


def maybe_seed_products():
  products_path = ROOT / 'products.json'
  if products_path.exists():
    return
  sample = [
    {
      "id": "p001",
      "name": "Wireless Headphones",
      "price": "29.99",
      "currency": "USD",
      "image": "/public/images/headphones.jpg",
      "description": "High quality wireless headphones with noise cancellation.",
      "category": "Audio"
    }
  ]
  products_path.write_text(json.dumps(sample, indent=2), encoding='utf-8')


def main():
  parser = argparse.ArgumentParser(description='AI site generator placeholder')
  parser.add_argument('--prompt', required=True, help='Path to prompt file')
  args = parser.parse_args()

  ensure_structure()
  _ = read_prompt(Path(args.prompt))
  maybe_seed_products()
  print('AI generator placeholder executed. Structure ensured and products seeded if missing.')


if __name__ == '__main__':
  main()

