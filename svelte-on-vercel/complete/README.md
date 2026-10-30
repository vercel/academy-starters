# Svelte on Vercel: complete

> This is the finished app for **[Svelte on Vercel](https://vercel.com/academy/svelte-on-vercel)** on Vercel Academy. Use it to check your work as you go through the course.

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

## Ski Alerts, complete

The finished implementation. The starter lives in the [`starter`](../starter) folder next to this one.

This project uses SvelteKit 3, Svelte 5, Vite 8, and the Vercel adapter 7. SvelteKit and adapter options live in `vite.config.ts`.

## What's Implemented

- **Streaming AI chat** with tool calling for natural language alert creation
- **Structured output** parsing natural language into validated alert data
- **Background workflows** with `waitUntil()`, `Promise.allSettled`, and error classification
- **ISR caching** on the conditions dashboard
- **Centralized AI provider** with usage tracking middleware
- **Observability** with structured logging and request IDs
- **Performance** with Cache-Control headers on API routes

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Streaming AI chat with alert creation tools |
| `/api/parse-alert` | POST | Structured output from natural language |
| `/api/evaluate` | GET, POST | Alert evaluation against live weather |
| `/api/workflow` | POST | Durable background workflow |
| `/api/health` | GET | Node.js runtime health check |
