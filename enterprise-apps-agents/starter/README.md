# Enterprise Apps and Agents: starter

> This is the starter for **[Enterprise Apps and Agents](https://vercel.com/academy/enterprise-apps-agents)** on Vercel Academy. Start at [lesson 1.1, Deploy the Prototype](https://vercel.com/academy/enterprise-apps-agents/deploy-the-prototype).

## Run it locally

### Prerequisites

- Node.js 24 or later
- pnpm, to match the `pnpm-lock.yaml` in this folder
- A Vercel account with AI Gateway access

### Environment variables

Copy `.env.example` to `.env.local`, then fill in:

- `AI_GATEWAY_API_KEY`: authenticates the prototype's model calls through AI Gateway. The starter contains no hardcoded secret.

### Commands

```bash
pnpm install
pnpm dev
```

## About this folder

This `starter` folder is the stable starting point for the Vercel Academy course **Enterprise Apps and Agents**. It contains Vendor Review, a useful prototype that is intentionally incomplete:

- Requests and assessments are not persisted
- Model output is free text
- Deterministic company policy is not represented in code
- There is no durable human-review process
- There is no application lifecycle record

The [`implementation-start`](https://github.com/vercel/academy-starters/tree/main/enterprise-apps-agents/implementation-start) folder contains the unfinished application scaffold that Section 3 starts from. The finished reference lives in the [`complete`](https://github.com/vercel/academy-starters/tree/main/enterprise-apps-agents/complete) folder. Keep your course work on a separate branch so you can compare it with either state without replacing your work.

The three files in `docs/` are course templates. They replace the pile of one-off planning documents that prototypes seem to collect when nobody is watching.

Creating a comparable interface with v0 is optional. The course begins from the behavior in this folder, including the gaps listed above.
