# Optimize Your Vercel Account: starter

> This is the starter for **[Optimize Your Vercel Account](https://vercel.com/academy/optimize-your-vercel-account)** on Vercel Academy. Start at [lesson 1.1, Deploy Saturday](https://vercel.com/academy/optimize-your-vercel-account/deploy-saturday).

## Run it locally

### Prerequisites

- Node.js 22 or later. `package.json` doesn't pin a version; the course asks for 22.
- npm. This folder ships without a lockfile, so Vercel installs with npm too.
- A Vercel account

### Environment variables

Copy `.env.example` to `.env.local`, then fill in:

- `DROP_WEBHOOK_SECRET`: validates incoming requests to the drop-launch webhook at `/api/drop-launch`. Any long random string works locally. Lesson 2.1 stores it on Vercel as a Secret.

### Commands

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Saturday

The public site for Saturday, a fictional indie sneaker brand. This is the working project for the [Optimize Your Vercel Account](https://vercel.com/academy/optimize-your-vercel-account) course on Vercel Academy.

You'll deploy this app to your own Vercel account, then walk through the course applying security, cost, and operations configurations to the real project.

## What's in here

- `app/`: Next.js 16 App Router pages and API routes
- `app/data/`: Static JSON-shaped product and drop data
- `public/products/`: Product hero images
- `app/api/stock-check/`: Stock-check endpoint (rate-limit target)
- `app/api/drop-launch/`: Drop-launch webhook (revalidates `/drops`)

## Pages

- `/`: Homepage with the next drop teaser and featured products
- `/drops`: Upcoming drop schedule
- `/products/[slug]`: Product detail pages with hero shots

## Deploying

You'll deploy this to your own Vercel team in Lesson 1.1. From there, every course lesson configures something on that real deployment.
