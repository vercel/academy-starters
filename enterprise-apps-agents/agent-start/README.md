# Enterprise Apps and Agents: agent-start

> This is a checkpoint for **[Enterprise Apps and Agents](https://vercel.com/academy/enterprise-apps-agents)** on Vercel Academy. [Lesson 3.5, Build the Intake Agent](https://vercel.com/academy/enterprise-apps-agents/build-the-intake-agent) copies files from this folder into your project.

## Run it locally

### Prerequisites

- Node.js 24 or later
- pnpm, to match the `pnpm-lock.yaml` in this folder
- A Vercel account with AI Gateway access
- A [Neon](https://neon.tech) Postgres database

### Environment variables

Copy `.env.example` to `.env.local`, then fill in:

- `AI_GATEWAY_API_KEY`: authenticates model calls through AI Gateway.
- `DATABASE_URL`: the Neon Postgres connection string. Run `scripts/schema.sql` against that database first.
- `VENDOR_REVIEW_URL`: the base URL of the running Vendor Review app, where the eve intake agent submits requests.
- `VENDOR_REVIEW_REQUESTER_EMAIL`: the requester email the intake agent submits requests as.
- `ALLOW_DEMO_IDENTITY` and `NEXT_PUBLIC_DEMO_IDENTITY`: turn on the development-only demo identity, which the UI marks with a warning. See [Identity boundary](#identity-boundary).
- `VERIFIED_USER_EMAIL_HEADER`, `VERIFIED_USER_SUBJECT_HEADER`, `VERIFIED_USER_GROUPS_HEADER`: for a real deployment, the headers a trusted identity proxy sets with the user's email, subject, and groups.

### Commands

```bash
pnpm install
pnpm dev
```

`pnpm workflow:web` opens the local workflow dashboard.

## About this folder

The `agent-start` folder is the prepared starting point for the bounded intake-agent exercise. It includes:

- Deterministic cost and data-routing policy
- Structured model assessment through AI Gateway
- Separate persisted policy, model, and human evidence
- Idempotent request creation
- A durable Workflow SDK review process
- Eve dependencies, runtime limits, and a one-tool capability surface
- A request-tool scaffold and approval-boundary eval to complete
- A development-only identity adapter that is visibly unsafe for real deployment

The `complete` folder contains the finished agent instructions and approval-gated request tool.

## Evaluation lab

The checked-in case set covers ordinary requests, exact policy boundaries,
ambiguous purposes, and prompt-injection attempts.

```bash
pnpm eval:policy  # 12 deterministic checks; no credentials required
pnpm eval         # policy checks plus live model assessments
```

The live suite requires `AI_GATEWAY_API_KEY`. Model expectations allow bounded
variation while still enforcing category/risk ranges, missing-information
coverage, and forbidden injected language.

## Identity boundary

`ALLOW_DEMO_IDENTITY=true` enables request headers supplied by the demo UI and displays a warning. It exists only so the course can exercise authorization locally.

A real deployment must disable it and connect `getVerifiedPrincipal()` to trusted identity context. The application must also add row-level authorization before serving requests to a broader employee population.
