# Saturday

The public site for Saturday, a fictional indie sneaker brand. This is the working project for the [Optimize Your Vercel Account](https://vercel.com/academy) course on Vercel Academy.

You'll deploy this app to your own Vercel account, then walk through the course applying security, cost, and operations configurations to the real project.

## Quick start

```bash
pnpm install
cp .env.example .env.local
# Set DROP_WEBHOOK_SECRET to any long random string
pnpm dev
```

Visit http://localhost:3000.

## What's in here

- `app/` — Next.js 16 App Router pages and API routes
- `app/data/` — Static JSON-shaped product and drop data
- `public/products/` — Product hero images
- `app/api/stock-check/` — Stock-check endpoint (rate-limit target)
- `app/api/drop-launch/` — Drop-launch webhook (revalidates `/drops`)

## Pages

- `/` — Homepage with the next drop teaser and featured products
- `/drops` — Upcoming drop schedule
- `/products/[slug]` — Product detail pages with hero shots

## Deploying

You'll deploy this to your own Vercel team in Lesson 1.1. From there, every course lesson configures something on that real deployment.
