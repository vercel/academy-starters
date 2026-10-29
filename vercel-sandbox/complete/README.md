# repo-review (complete)

The finished implementation for the [Vercel Sandbox course on Vercel Academy](https://vercel.com/academy/vercel-sandbox). Matches the end of lesson 5.4.

Following the course? Start from [`../starter`](../starter) and build this yourself.

## Setup

Requires Node.js 22.12 or later.

```bash
pnpm install
vercel link
vercel env pull .env
```

`vercel env pull` writes a development OIDC token that authenticates both Sandbox and AI Gateway.

## Run a review

```bash
pnpm review https://github.com/vercel/examples
```

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
