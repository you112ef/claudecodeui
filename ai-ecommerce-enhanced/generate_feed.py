#!/usr/bin/env python3
import json
import sys
from datetime import datetime
from xml.etree.ElementTree import Element, SubElement, tostring

PRODUCTS_PATH = "products.json"
OUTPUT_PATH = "google_shopping_feed.xml"


def build_text_element(parent, tag, text):
    el = SubElement(parent, tag)
    el.text = text
    return el


def main():
    try:
        with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
            products = json.load(f)
    except FileNotFoundError:
        print(f"Missing {PRODUCTS_PATH}", file=sys.stderr)
        sys.exit(1)

    rss = Element("rss", attrib={"version": "2.0", "xmlns:g": "http://base.google.com/ns/1.0"})
    channel = SubElement(rss, "channel")
    build_text_element(channel, "title", "TechShop Product Feed")
    build_text_element(channel, "link", "https://yourdomain.com/")
    build_text_element(channel, "description", "Product feed for Google Merchant")
    build_text_element(channel, "lastBuildDate", datetime.utcnow().isoformat() + "Z")

    for p in products:
        item = SubElement(channel, "item")
        build_text_element(item, "g:id", p.get("id", ""))
        build_text_element(item, "title", p.get("name", ""))
        build_text_element(item, "description", p.get("description", ""))
        build_text_element(item, "link", f"https://yourdomain.com/pages/product.html?id={p.get('id','')}")
        build_text_element(item, "g:image_link", f"https://yourdomain.com{p.get('image','')}")
        build_text_element(item, "g:availability", "in stock")
        build_text_element(item, "g:price", f"{p.get('price','0')} {p.get('currency','USD')}")
        build_text_element(item, "g:condition", "new")
        if p.get("category"):
            build_text_element(item, "g:product_type", p["category"])

    xml_bytes = tostring(rss, encoding="utf-8")
    with open(OUTPUT_PATH, "wb") as f:
        f.write(xml_bytes)
    print(f"Wrote {OUTPUT_PATH} with {len(products)} items.")


if __name__ == "__main__":
    main()
