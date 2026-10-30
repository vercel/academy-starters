# Creating a Software Factory: complete

> This is the finished app for **[Creating a Software Factory](https://vercel.com/academy/creating-a-software-factory)** on Vercel Academy. Use it to check your work as you go through the course.

## Run it locally

### Prerequisites

- Node.js 24 (`engines` asks for `24.x`)
- pnpm 10.19.0, from `packageManager` in `package.json`
- A Vercel account and the latest [Vercel CLI](https://vercel.com/docs/cli), for live runs
- A GitHub account and a repository for the factory to work against, for live runs

### Environment variables

`.env.example` lists the course configuration. `pnpm validate`, `pnpm trace`, and the eval list run without them. For live runs, add each one to a linked Vercel project and pull them into `.env.local` with `vercel env pull .env.local`. The [starter README](../starter/README.md#commands) walks through those commands.

- `FACTORY_REPO`: the repository the factory works on, as `owner/repo`.
- `FACTORY_LABEL`: the GitHub issue label that hands an issue to the factory.
- `FACTORY_BRANCH_PREFIX`: the prefix for the branches the factory creates.
- `FACTORY_SETUP_COMMAND`: the command a sandbox runs to install dependencies after it clones the repo.
- `GITHUB_CONNECTOR`: the Vercel Connect GitHub connector UID, as printed by `vercel connect list`.
- `FACTORY_MODEL`: the default model for every station.
- `ROUTER_MODEL`: overrides the model for the router station.
- `BUILDER_MODEL` and `VERIFIER_MODEL` (optional): override the model for one station.

### Commands

```bash
pnpm install
pnpm validate
pnpm dev
```

This folder reports five tools and three subagents. The starter reports zero of each.

## What's in here

This folder is the completed reference. It includes five root tools, Investigator, Builder, and Verifier subagents, approval gates, draft pull request policy, traces, and evaluations. The course starter is in the [`starter`](https://github.com/vercel/academy-starters/tree/main/creating-a-software-factory/starter) folder.

## Inspect the factory

```bash
pnpm trace
pnpm exec eve eval --list
```
