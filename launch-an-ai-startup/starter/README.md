# Up and to the Right: starter

The starter for **Launch an AI Startup on Vercel** on Vercel Academy. Up and to the Right drafts a founder's monthly investor update from their notes and their numbers.

You get the UI, the sample data, and the database schema. The course has you build the parts that run on Vercel.

## Requirements

- Node.js 24 or later
- A Vercel account and a GitHub account

```bash
npm install
npm run dev
```

The dashboard shows Starter Pack's October numbers from `lib/sample-data.ts`.

## What's here

| File | What it does |
| --- | --- |
| `app/page.tsx` | The dashboard. You replace it as the course adds data, sign-in, the AI draft, and the agent. |
| `app/new-update-form.tsx` | Saves a founder's notes. Posts to `/api/updates`, which you write in 2.1. |
| `app/draft-panel.tsx` | Streams and renders an AI draft from `/api/draft`, which you write in 3.1. |
| `app/agent-panel.tsx` | Talks to the eve agent you add in 4.1, including approvals and charts. |
| `lib/sample-data.ts` | Two founders and three months of metrics. |
| `lib/highlights.ts` | MRR growth, new customers, and burn multiple for a month. |
| `lib/updates.ts`, `lib/db.ts` | Postgres queries for notes and metrics. |
| `lib/draft-schema.ts` | The Zod schema every investor update follows. |
| `lib/served-by.ts` | Reads which model answered from AI Gateway's routing metadata. |
| `db/schema.sql`, `scripts/setup-db.mts` | Tables and sample metrics. Run with `npm run db:setup` in 2.1. |
| `scripts/set-channel.mts` | Operator-only: assigns each founder's investor channel. Run with `npm run channel:set` in 4.2. |
| `evals/cases.mts` | Ten fixed cases for the eval runner you write in 3.5. |

## What you build

| Lesson | You add |
| --- | --- |
| 1.1 | `app/api/health/route.ts` |
| 1.2 | The environment banner in `app/page.tsx` |
| 2.1 | `app/api/updates/route.ts`, the dashboard reading Postgres |
| 2.2 | `lib/auth.ts`, `lib/auth-client.ts`, `lib/session.ts`, `app/api/auth/[...all]/route.ts`, `app/sign-in/`, `app/api/updates/[id]/route.ts` |
| 2.3 | `vercel.json`, `app/api/queues/highlights/route.ts` |
| 3.1 to 3.4 | `app/api/draft/route.ts`, `lib/tools/get-metrics.ts`, `lib/draft.ts` |
| 3.5 | `evals/draft.eval.mts` |
| 4.1 to 4.4 | `agent/`, `lib/founder-channels.ts`, `lib/slack-posts.ts`, `withEve` in `next.config.ts` |
| 5.1 | `lib/request-id.ts` |
| 5.2 | `instrumentation-client.ts` |
| 5.3 | `flags.ts`, `app/.well-known/vercel/flags/route.ts` |

The finished app is in `../complete`.
