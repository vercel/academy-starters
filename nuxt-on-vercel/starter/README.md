# Nuxt on Vercel: starter

> This is the starter for **[Nuxt on Vercel](https://vercel.com/academy/nuxt-on-vercel)** on Vercel Academy. Start at [lesson 1.1, Project Setup](https://vercel.com/academy/nuxt-on-vercel/nuxt-project-setup).

## Run it locally

### Prerequisites

- Node.js 22.22.3 or later in the 22 line, 24.15.0 or later in the 24 line, or 26 and up (from `engines` in `package.json`)
- pnpm. This folder has no lockfile, and the course uses pnpm.
- A GitHub account, for the OAuth login you add in Section 3

### Environment variables

None yet. [Lesson 3.1, Auth Setup](https://vercel.com/academy/nuxt-on-vercel/auth-setup) adds `NUXT_OAUTH_GITHUB_CLIENT_ID`, `NUXT_OAUTH_GITHUB_CLIENT_SECRET`, and `NUXT_SESSION_PASSWORD` in a `.env` file.

### Commands

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## What's already here

- Nuxt 4 scaffold with Tailwind CSS v4
- A base layout and placeholder pages
- Hot spring data in `server/data/springs.json`

## What you'll build

Components, server routes, data fetching, GitHub OAuth with nuxt-auth-utils, favorites, visit tracking, and reviews. Each lesson tells you exactly what to add.

The finished app lives in the [`complete`](../complete) folder next to this one.
