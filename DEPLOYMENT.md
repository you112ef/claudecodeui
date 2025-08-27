# Cloudflare Pages Deployment Guide

This project is configured to work with Cloudflare Pages for static hosting.

## Prerequisites

1. A Cloudflare account
2. A GitHub repository with this code
3. GitHub Actions enabled

## Setup Steps

### 1. Get Cloudflare Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to "My Profile" → "API Tokens"
3. Create a new token with the following permissions:
   - Account: Cloudflare Pages:Edit
   - Zone: Zone:Read
4. Copy the token

### 2. Get Account ID

1. In Cloudflare Dashboard, note your Account ID from the right sidebar

### 3. Set GitHub Secrets

1. Go to your GitHub repository
2. Go to Settings → Secrets and variables → Actions
3. Add the following secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID

### 4. Deploy

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to Cloudflare Pages
3. Your site will be available at: `https://claude-code-ui.pages.dev`

## Manual Deployment

If you prefer to deploy manually:

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Build the project:
   ```bash
   npm run build:pages
   ```

4. Deploy:
   ```bash
   wrangler pages deploy dist
   ```

## Notes

- This deployment only includes the frontend (React app)
- Backend features requiring Node.js will not work on Cloudflare Pages
- The app will work as a static frontend application
- All API calls will need to be configured to point to your backend server