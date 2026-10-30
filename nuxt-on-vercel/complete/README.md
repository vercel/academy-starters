# Nuxt on Vercel: complete

> This is the finished app for **[Nuxt on Vercel](https://vercel.com/academy/nuxt-on-vercel)** on Vercel Academy. Use it to check your work as you go through the course.

## Run it locally

### Prerequisites

- Node.js 22.22.3 or later in the 22 line, 24.15.0 or later in the 24 line, or 26 and up (from `engines` in `package.json`)
- pnpm. This folder has no lockfile, and the course uses pnpm.
- A GitHub account and a GitHub OAuth app for the login

### Environment variables

Copy `.env.example` to `.env`, then fill in:

- `NUXT_OAUTH_GITHUB_CLIENT_ID`: the Client ID of your GitHub OAuth app.
- `NUXT_OAUTH_GITHUB_CLIENT_SECRET`: the Client Secret of that OAuth app.
- `NUXT_SESSION_PASSWORD`: a random string of at least 32 characters. It encrypts the session cookie.

### Commands

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000. The starter lives in the [`starter`](../starter) folder next to this one.
