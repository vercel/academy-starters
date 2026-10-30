# Vercel Sandbox: complete

> This is the finished app for **[Vercel Sandbox](https://vercel.com/academy/vercel-sandbox)** on Vercel Academy. Use it to check your work as you go through the course.

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
pnpm review https://github.com/vercel/examples
```

`pnpm review` runs the CLI against any public GitHub repository URL.

## repo-review

The finished implementation for the [Vercel Sandbox course on Vercel Academy](https://vercel.com/academy/vercel-sandbox). Matches the end of [lesson 5.4, Formatted Reports](https://vercel.com/academy/vercel-sandbox/formatted-reports).

Following the course? Start from [`../starter`](../starter) and build this yourself.

## Architecture

```
src/
├── cli.ts                 # commander setup, pipeline orchestration, timing, error handling
├── sandbox-lifecycle.ts   # Sandbox creation (from a snapshot ID when configured), clone, file collection, test run
├── analyze.ts             # Zod-backed structured AI review with generateText and Output.object
├── test-runner.ts         # detectPackageManager + parseTestFailures
└── reporter.ts            # severity-sorted, CI-aware output
```

The pipeline:

1. **Validate** the GitHub URL (CLI, exit code 2 on bad input)
2. **Boot** a named Sandbox, restoring `SANDBOX_SNAPSHOT_ID` when it's set
3. **Clone** the repo into the Sandbox and abort if the clone fails
4. **Collect** a small set of files of interest (`package.json`, `src/index.ts`, etc.)
5. **Install** dependencies using the detected package manager
6. **Test** with the matching test command, capturing stdout/stderr
7. **Analyze** the collected files with `openai/gpt-5.3-codex` and a Zod schema
8. **Parse** test failures into structured findings
9. **Merge** AI and test findings, escalating risk if any test failed
10. **Report** the result with severity sorting and CI-friendly output

## Exit codes

| Code | Meaning |
|------|---------|
| 0 | Review ran end-to-end |
| 1 | Runtime failure (clone, sandbox, etc.) |
| 2 | Bad user input (invalid GitHub URL) |

## Tech stack

- [`@vercel/sandbox`](https://vercel.com/docs/sandbox)
- [AI SDK 7](https://ai-sdk.dev/) with AI Gateway (`openai/gpt-5.3-codex`)
- [`commander`](https://github.com/tj/commander.js)
- [`zod`](https://zod.dev/)
- TypeScript 5, `tsx`, `pnpm`
