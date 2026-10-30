# Building Filesystem Agents: complete

> This is the finished app for **[Building Filesystem Agents](https://vercel.com/academy/filesystem-agents)** on Vercel Academy. Use it to check your work as you go through the course.

## Run it locally

### Prerequisites

- Node.js 22 or later
- pnpm 10.24.0, from `packageManager` in `package.json`
- A Vercel account, the [Vercel CLI](https://vercel.com/docs/cli), and an [AI Gateway API key](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys&title=AI+Gateway+API+Keys)

### Environment variables

There's no `.env.example`. Link the folder to a Vercel project, then pull its variables into `.env.local`:

```bash
vc link
vc env pull
```

- `VERCEL_OIDC_TOKEN`: written by `vc env pull`. It authenticates Vercel Sandbox and is short-lived, so run `vc env pull` again if Sandbox calls start failing with authentication errors.
- `AI_GATEWAY_API_KEY`: add it to `.env.local` yourself. It authenticates the agent's model calls.

### Commands

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 and ask a question about the call transcripts in `lib/calls/`, like `did they mention pricing?`
