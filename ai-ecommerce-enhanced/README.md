# AI-Powered E-Commerce Website Generator (Enhanced)

Create and deploy a static e-commerce site with AI-assisted generation, dynamic products, and Google Merchant feed.

## Features
- Prompt-driven site generation
- Static deploy (Vercel)
- Products via `products.json`
- Google Merchant feed (`google_shopping_feed.xml`)
- Tailwind UI
- SEO: `sitemap.xml`, `robots.txt`

## Quickstart
```bash
# Generate skeleton from prompt (placeholder)
python3 api/generate_site.py --prompt prompt_input.txt

# Generate Google feed
python3 generate_feed.py
```

## Deploy
1. Push to GitHub
2. Import repo in Vercel (Framework: Other)
3. Set custom domain, then configure email (Zoho/ImprovMX)

## Update Products
- Edit `products.json`
- Commit and push; Vercel redeploys

## Structure
- `pages/`: `index.html`, `products.html`, `product.html`, legal pages
- `public/js/`: `products.js`, `product.js`
- `products.json`: catalog
- `generate_feed.py`: feed generator
- `sitemap.xml`, `robots.txt`: SEO

