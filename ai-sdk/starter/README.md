# Builders Guide to the AI SDK: starter

> This is the starter for **[Builders Guide to the AI SDK](https://vercel.com/academy/ai-sdk)** on Vercel Academy. Start at [lesson 1.3, AI SDK Dev Setup](https://vercel.com/academy/ai-sdk/ai-sdk-dev-setup).

## Run it locally

### Prerequisites

- Node.js 22 or later
- pnpm, to match the `pnpm-lock.yaml` in this folder
- A Vercel account with AI Gateway access
- The [Vercel CLI](https://vercel.com/docs/cli) if you use OIDC instead of an API key

### Environment variables

Put one of these in `.env.local`. You only need one.

- `AI_GATEWAY_API_KEY`: an AI Gateway API key from the Vercel dashboard. The simplest option for local work.
- `VERCEL_OIDC_TOKEN`: written for you by `vercel link` and `vercel env pull`. It expires after 12 hours; `vercel dev` refreshes it while it runs, or run `vercel env pull` again.

`.env.example` lists both, plus an optional `VERCEL_AI_GATEWAY_URL` override. Provider keys (OpenAI, Anthropic and so on) belong in the AI Gateway settings in the Vercel dashboard, not in this file.

### Commands

```bash
pnpm install
pnpm tsx env-check.ts   # confirms your key or token is found
pnpm dev
```

Open http://localhost:3000 to see the lesson navigation page.

## Lesson code

### Command-line lessons

Run these with the scripts in `package.json`:

- **1.4 Data Extraction**: `pnpm extraction`
- **2.1 Introduction to Invisible AI**: `pnpm invisible-ai:compare` and `pnpm invisible-ai:demo`
- **2.2 Text Classification**: `pnpm classification`

### Web lessons

Open these from the home page at http://localhost:3000:

- **2.3 Automatic Summarization**: `/summarization`
- **2.4 Structured Data Extraction**: `/extraction`
- **3.1 Basic Chatbot** and the rest of Section 3: `/chat`

## Project structure

```
├── app/
│   ├── (1-extraction)/        # CLI extraction lesson
│   ├── (2-classification)/    # CLI classification lesson
│   ├── (2-invisible-ai)/      # CLI invisible AI demos
│   ├── (3-summarization)/     # Web summarization lesson
│   ├── (4-extraction)/        # Web extraction lesson
│   ├── (5-chatbot)/           # Web chatbot lesson
│   └── page.tsx               # Navigation homepage
├── components/ui/             # Reusable UI components
├── lib/                       # Utility functions
└── env-check.ts               # Checks your AI Gateway credentials
```

## Technologies used

- [Next.js 16](https://nextjs.org) for the app
- [AI SDK 7](https://ai-sdk.dev/docs) for model calls
- [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) for model access
- [Tailwind CSS v4](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) for styling
- [TypeScript](https://www.typescriptlang.org)

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Facademy-starters%2Ftree%2Fmain%2Fai-sdk%2Fstarter)
