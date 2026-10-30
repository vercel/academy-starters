# Svelte on Vercel: starter

> This is the starter for **[Svelte on Vercel](https://vercel.com/academy/svelte-on-vercel)** on Vercel Academy. Start at [lesson 1.1, Deploy to Vercel](https://vercel.com/academy/svelte-on-vercel/deploy-svelte-to-vercel).

## Run it locally

### Prerequisites

- Node.js 22 or later
- npm, to match the `package-lock.json` in this folder
- A Vercel account with AI Gateway access

### Environment variables

Copy `.env.example` to `.env`, then fill in:

- `AI_GATEWAY_API_KEY`: authenticates the AI features through AI Gateway. The weather data comes from Open-Meteo and needs no key.

### Commands

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## Ski Alerts

A SvelteKit app that tracks ski resort conditions and creates personalized alerts using AI. This is the starter project for the course.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Facademy-starters%2Ftree%2Fmain%2Fsvelte-on-vercel%2Fstarter&project-name=ski-alerts&repository-name=ski-alerts)

This project uses SvelteKit 3, Svelte 5, Vite 8, and the Vercel adapter 7. SvelteKit and adapter options live in `vite.config.ts`.

## What's Already Built

The UI, data layer, and routing are ready to go:

- **Conditions dashboard** showing live weather for 5 ski resorts
- **Alerts page** with localStorage persistence
- **Chat interface** wired up and waiting for a streaming endpoint
- **Resort data** for Mammoth, Palisades Tahoe, Grand Targhee, Steamboat, and Mt. Bachelor
- **Weather service** pulling from Open-Meteo (free, no API key needed)
- **Alert schemas** validated with Valibot

## What You'll Build

Look for `// TODO:` comments in the codebase. Throughout the course, you'll implement:

1. **AI chat endpoint** (`src/routes/api/chat/+server.ts`): Streaming responses with tool calling
2. **Structured output** (`src/routes/api/parse-alert/+server.ts`): Natural language to structured alert data
3. **Background workflow** (`src/routes/api/workflow/+server.ts`): Durable execution with error handling
4. **ISR caching** (`src/routes/+page.server.ts`): Incremental Static Regeneration for the dashboard
5. **AI provider** (`src/lib/ai/provider.ts`): Centralized model config with usage tracking

## Project Structure

```
src/
├── lib/
│   ├── ai/              # AI provider config (TODO)
│   ├── components/      # ResortCard, AlertCard, Chat
│   ├── data/            # Resort metadata
│   ├── schemas/         # Alert Valibot schemas
│   └── services/        # Weather API, alert evaluation
├── routes/
│   ├── +page.svelte     # Conditions dashboard
│   ├── alerts/          # My Alerts page
│   └── api/
│       ├── chat/        # AI streaming endpoint (TODO)
│       ├── evaluate/    # Alert evaluation
│       ├── parse-alert/ # Structured output (TODO)
│       └── workflow/    # Background workflow (TODO)
```

## Complete reference

The finished implementation lives in the [`complete`](../complete) folder next to this one.

## Tech Stack

- [SvelteKit](https://svelte.dev/) with [adapter-vercel](https://github.com/sveltejs/kit/tree/main/packages/adapter-vercel)
- [AI SDK 7](https://ai-sdk.dev/docs) for streaming chat and tool calling
- [Valibot](https://valibot.dev/) for schema validation
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Open-Meteo](https://open-meteo.com/) for weather data
