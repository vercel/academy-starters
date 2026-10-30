# Using AI Gateway in Production: starter

> This is the starter for **[Using AI Gateway in Production](https://vercel.com/academy/ai-gateway)** on Vercel Academy. Deploy it from the course page, then start at [lesson 1.1, Why AI Gateway?](https://vercel.com/academy/ai-gateway/why-ai-gateway).

## Run it locally

### Prerequisites

- Node.js 22 or later
- pnpm, to match the `pnpm-lock.yaml` in this folder
- A Vercel account with AI Gateway access

### Environment variables

Copy `.env.example` to `.env.local`, then fill in:

- `AI_GATEWAY_API_KEY`: authenticates AI Gateway calls on your machine. Create one in the Vercel dashboard under AI Gateway, API Keys. Deployments on Vercel use OIDC, so the deployed app doesn't need it.

### Commands

```bash
pnpm install
pnpm dev
```

The order window opens at http://localhost:3000. The per-lesson scripts load `.env.local` on their own (they run through `node --env-file-if-exists`), so the same key covers the app and every `pnpm <script>` command below.

## Taco Tuesday

The ordering assistant for a taco truck that went viral and now spends real money on every request. This is the shared demo app for every lesson in the course.

Two AI features, on purpose (they have different cost profiles, which several lessons compare):

- **Order chat**: `POST /api/order`, streaming, cheap fast model, and the full menu rides along as instructions on every request. High volume, latency-sensitive. The production workhorse.
- **Daily special generator**: `pnpm describe-special`, a pricier creative model that runs occasionally. The contrast feature for spend tracking and provider routing.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Facademy-starters%2Ftree%2Fmain%2Fai-gateway%2Fstarter&project-name=taco-tuesday-demo&repository-name=taco-tuesday-demo)

No environment variables needed on Vercel: AI Gateway authenticates deployments with OIDC. The API key above is only for local development.

## Per-lesson scripts

| Script | Lesson |
| --- | --- |
| `pnpm one-key` | 1.1 Why AI Gateway? |
| `pnpm existing-stack` | 1.2 Works with Your Stack |
| `pnpm switch-models` | 1.3 Switch Models Fast |
| `pnpm outage-drill` | 1.4 Survive an Outage |
| `pnpm migrated-stack` | 1.5 Migrate from OpenAI SDK |
| `pnpm latency-guard` | 1.6 Fail Over on Latency |
| `pnpm pin-provider` | 1.7 Pin a Provider |
| `pnpm cost-check` | 2.1 How Pricing Works, 2.4 Use Your AI Credits |
| `pnpm route-cheapest` | 2.2 Route to Cheapest |
| `pnpm cache-check` | 2.3 Cut Costs with Caching |
| `pnpm whose-key` | 2.6 Bring Your Own Keys |
| `pnpm seed-traffic` | 3.1 See Where Money Goes |
| `pnpm private-prompts` | 3.2 Keep Prompts Private |
| `pnpm tag-orders` | Extra: tags requests by feature and user |
| `pnpm describe-special` | Extra: the truck's second feature |
