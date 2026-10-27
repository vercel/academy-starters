# repo-review (complete)

The finished implementation for the [Vercel Sandbox course on Vercel Academy](https://vercel.com/academy/vercel-sandbox). Matches the end of lesson 5.4.

> Following the course? Check out the `start` branch and build this yourself:
> ```bash
> git checkout start
> ```

## Setup

```bash
pnpm install
cp .env.example .env
# Fill in VERCEL_TOKEN, VERCEL_TEAM, and AI_GATEWAY_API_KEY in .env
```

## Run a review

```bash
pnpm review https://github.com/vercel/examples
```

## Architecture

```
src/
├── cli.ts                 # commander setup, pipeline orchestration, timing, error handling
├── sandbox-lifecycle.ts   # Sandbox creation (with snapshot fallback), clone, file collection, test run
├── analyze.ts             # Zod-backed structured AI review with generateObject
├── test-runner.ts         # detectPackageManager + parseTestFailures
└── reporter.ts            # severity-sorted, CI-aware output
```

The pipeline:

1. **Validate** the GitHub URL (CLI, exit code 2 on bad input)
2. **Boot** a Sandbox from snapshot, falling back to default creation if missing
3. **Clone** the repo into the Sandbox and abort if the clone fails
4. **Collect** a small set of files of interest (`package.json`, `src/index.ts`, etc.)
5. **Install** dependencies using the detected package manager
6. **Test** with the matching test command, capturing stdout/stderr
7. **Analyze** the collected files with `openai/codex-5.3` and a Zod schema
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
- [AI SDK v6](https://sdk.vercel.ai/) with AI Gateway (`openai/codex-5.3`)
- [`commander`](https://github.com/tj/commander.js)
- [`zod`](https://zod.dev/)
- TypeScript 5, `tsx`, `pnpm`
