# Vercel Sandbox: starter

> This is the starter for **[Vercel Sandbox](https://vercel.com/academy/vercel-sandbox)** on Vercel Academy. Start at [lesson 1.1, Your First Sandbox](https://vercel.com/academy/vercel-sandbox/your-first-sandbox).

## Run it locally

### Prerequisites

- Node.js 22.12 or later
- pnpm, to match the `pnpm-lock.yaml` in this folder
- A Vercel account and the [Vercel CLI](https://vercel.com/docs/cli)

### Environment variables

Run `vercel link`, then `vercel env pull .env`. That writes the variables to `.env`, which the scripts load. `.env.example` lists them:

- `VERCEL_OIDC_TOKEN`: written by `vercel env pull`. It authenticates both Vercel Sandbox and AI Gateway.
- `AI_GATEWAY_API_KEY` (optional): an AI Gateway API key to use instead of the OIDC token for model calls.
- `SANDBOX_SNAPSHOT_ID` (optional): a snapshot to restore for faster Sandbox cold starts. [Lesson 5.2](https://vercel.com/academy/vercel-sandbox/sandbox-snapshots-for-speed) creates one.

### Commands

```bash
pnpm install
pnpm type-check
```

There's no dev server yet. `src/` starts empty, and lesson 1.1 adds `src/sandbox-lifecycle.ts` and runs it with `pnpm tsx --env-file=.env src/sandbox-lifecycle.ts`. The `review` script arrives with the CLI in Section 2.

## repo-review

CLI code review agent built on Vercel Sandbox. The project for the [Vercel Sandbox course on Vercel Academy](https://vercel.com/academy/vercel-sandbox).

This folder is the scaffold. Dependencies and tooling are set up, and `src/` is empty. You build the CLI lesson by lesson. The finished version lives next door in [`../complete`](../complete) if you get stuck or want to compare.

## What you'll build

A CLI named `repo-review` that takes a GitHub URL, clones the repo into an isolated Vercel Sandbox, runs the test suite, generates a structured AI review with `openai/gpt-5.3-codex`, and prints a severity-sorted combined report.

By the end of the course, `src/` will contain:

- `sandbox-lifecycle.ts`: Sandbox creation, clone, file collection, test run
- `cli.ts`: `commander` setup, URL validation, pipeline orchestration
- `analyze.ts`: Zod-backed structured AI review with `generateText` and `Output.object`
- `test-runner.ts`: failure parser and package-manager detection
- `reporter.ts`: severity-sorted, CI-aware output

## Tech stack

- [`@vercel/sandbox`](https://vercel.com/docs/sandbox)
- [AI SDK 7](https://ai-sdk.dev/) with AI Gateway (`openai/gpt-5.3-codex`)
- [`commander`](https://github.com/tj/commander.js)
- [`zod`](https://zod.dev/)
- TypeScript 5, `tsx`, `pnpm`
