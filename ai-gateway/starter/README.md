# Taco Tuesday — AI Gateway Course Demo

The ordering assistant for a taco truck that went viral and now spends real money on every request. This is the shared demo app for every lesson in Using AI Gateway in Production.

Two AI features, on purpose (they have different cost profiles, which several lessons compare):

- **Order chat** — `POST /api/order`, streaming, cheap fast model, the full menu rides along as instructions on every request. High volume, latency-sensitive. The production workhorse.
- **Daily special generator** — `pnpm describe-special`, pricier creative model, runs occasionally. The contrast feature for spend tracking and provider routing.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=REPO_URL_TBD)

No environment variables needed on Vercel: AI Gateway authenticates deployments with OIDC automatically. The API key below is only for local development.

<!-- REPO_URL_TBD: replace once the public template repo exists. This URL will appear in every lesson — set it before lessons reference clone instructions. -->

## Local development

```bash
pnpm install
cp .env.example .env.local   # add your AI Gateway API key (local only)
pnpm dev                     # order window at localhost:3000
```

The per-lesson scripts load `.env.local` automatically (they run through
`node --env-file-if-exists`), so the same key covers the app and every
`pnpm <script>` command below.

## Per-lesson scripts

| Script | Lesson |
| --- | --- |
| `pnpm one-key` | 1.1 why AI Gateway |
| `pnpm existing-stack` | 1.2 works with your stack (OpenAI SDK) |
| `pnpm switch-models` | 1.3 switch models fast |
| `pnpm outage-drill` | 1.4 survive an outage |
| `pnpm migrated-stack` | 1.5 migrate from OpenAI SDK |
| `pnpm latency-guard` | 1.6 fail over on latency |
| `pnpm pin-provider` | 1.7 pin a provider |
| `pnpm cost-check` | 2.1 How Is AI Gateway Priced? |
| `pnpm route-cheapest` | 2.2 route to the cheapest provider |
| `pnpm cache-check` | 2.3 cut costs with caching |
| `pnpm whose-key` | 2.6 bring your own keys |
| `pnpm private-prompts` | 3.2 keep prompts private |
| `pnpm tag-orders` | 3.5 spend per feature/user |
| `pnpm describe-special` | 3.5 spend per feature (the truck's second feature) |
