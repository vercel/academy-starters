# Production Monorepos with Turborepo: starter

> This is the starter for **[Production Monorepos with Turborepo](https://vercel.com/academy/production-monorepos)** on Vercel Academy. Start at [lesson 1.1, Understanding Monorepos](https://vercel.com/academy/production-monorepos/understanding-monorepos).

## Run it locally

### Prerequisites

- Node.js 20.19 or later in the 20 line, 22.13 or later in the 22 line, or 24 and up (from `engines` in `package.json`)
- pnpm 9.1.0, from `packageManager` in `package.json`
- A Vercel account for the deploy and Remote Caching lessons

### Environment variables

None. The starter's `web` app runs without any.

### Commands

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the marketing site.

## GeniusGarage

A developer platform for storing and sharing your favorite code snippets.

## What's Inside?

This monorepo uses [pnpm](https://pnpm.io) as a package manager and [Turborepo](https://turbo.build/repo) for build orchestration.

### Apps

- `web`: Marketing site built with Next.js

### Packages

Shared packages will be created as the course progresses.

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io)
- [Next.js Documentation](https://nextjs.org/docs)
