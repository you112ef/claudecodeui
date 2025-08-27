#!/bin/bash

# Cloudflare Pages Deployment Script
echo "🚀 Deploying to Cloudflare Pages..."

# Build the project
echo "📦 Building project..."
npm run build:pages

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📥 Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Deploy to Cloudflare Pages
echo "🌐 Deploying to Cloudflare Pages..."
wrangler pages deploy dist --project-name claude-code-ui

echo "🎉 Deployment completed!"
echo "Your site should be available at: https://claude-code-ui.pages.dev"