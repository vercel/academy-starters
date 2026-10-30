# Creating a Software Factory: starter

> This is the starter for **[Creating a Software Factory](https://vercel.com/academy/creating-a-software-factory)** on Vercel Academy. Start at [lesson 1.1, Would You Merge This?](https://vercel.com/academy/creating-a-software-factory/would-you-merge-this).

## Run it locally

### Prerequisites

- Node.js 24 (`engines` asks for `24.x`)
- pnpm 10.19.0, from `packageManager` in `package.json`
- A Vercel account and the latest [Vercel CLI](https://vercel.com/docs/cli)
- A GitHub account with your own copy of this folder. The factory works against that copy.

### Environment variables

`.env.example` lists the course configuration. You add each value to your linked Vercel project with `vercel env add`, then pull everything into `.env.local`, which also brings the local OIDC token.

- `FACTORY_REPO`: your copy of the project, as `owner/repo`. The factory clones it into sandboxes and opens draft pull requests against it.
- `FACTORY_LABEL`: the GitHub issue label that hands an issue to the factory.
- `FACTORY_BRANCH_PREFIX`: the prefix for the branches the factory creates.
- `FACTORY_SETUP_COMMAND`: the command a sandbox runs to install dependencies after it clones the repo.
- `GITHUB_CONNECTOR`: the Vercel Connect GitHub connector UID. It must match what `vercel connect list` prints.
- `FACTORY_MODEL`: the default model for every station.
- `ROUTER_MODEL`: a model for the router station. The starter code doesn't read it yet; the router arrives in Section 2.
- `BUILDER_MODEL` and `VERIFIER_MODEL` (optional): override the model for one station.

### Commands

Clone your copy, install, and link it:

```bash
git clone https://github.com/YOUR_GITHUB_NAME/signalworks-software-factory.git
cd signalworks-software-factory
pnpm install
pnpm exec eve link
```

Create and attach a managed GitHub connector:

```bash
vercel connect create github --name signalworks-factory --triggers
vercel connect attach github/signalworks-factory --triggers --trigger-path /eve/v1/github
vercel connect list
```

During GitHub App installation, grant access only to your course repository. Vercel Connect supplies short-lived installation tokens, so the project doesn't need a personal access token, webhook secret, or GitHub App private key.

Add the course configuration, then pull it and the local OIDC token into `.env.local`:

```bash
vercel env add FACTORY_REPO --value YOUR_GITHUB_NAME/signalworks-software-factory
vercel env add FACTORY_LABEL --value factory
vercel env add FACTORY_BRANCH_PREFIX --value factory/
vercel env add FACTORY_SETUP_COMMAND --value "pnpm install --frozen-lockfile"
vercel env add GITHUB_CONNECTOR --value github/signalworks-factory
vercel env pull .env.local
```

Keep the OIDC values that `vercel env pull` writes. Then validate the project and start the eve dev server:

```bash
pnpm validate
pnpm dev
```

`pnpm validate` reports zero tools and zero subagents in the starter. The `complete` folder reports five tools and three subagents.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Facademy-starters%2Ftree%2Fmain%2Fcreating-a-software-factory%2Fstarter&project-name=signalworks-software-factory&repository-name=signalworks-software-factory)

The button creates your copy on GitHub and connects it to a new Vercel project.

## Folders

- `starter` is the deployable course starter. It includes GitHub intake, repository sandbox infrastructure, the notification SDK, and four case fixtures. Learners build the factory from this folder.
- [`complete`](https://github.com/vercel/academy-starters/tree/main/creating-a-software-factory/complete) is the completed reference. It includes five root tools, Investigator, Builder, and Verifier subagents, approval gates, draft pull request policy, traces, and evaluations.

## Repository map

```text
agent/                         # eve agent, channels, policies, and stations
fixtures/issues/               # prompts for the four course cases
fixtures/runs/                 # recorded outcomes used before live model calls
packages/notification-sdk/     # sample TypeScript product the factory maintains
evals/                         # regression evaluations added in Section 5
```

This folder is the course template. Your personal copy is the factory's target: it is cloned into sandboxes, receives `factory/*` branches, and hosts draft pull requests.

## Invoke locally

After the course has added the root tools and instructions, invoke a fixture without the TUI:

```bash
pnpm exec eve invoke "$(cat fixtures/issues/bug-example.md)"
```

For an interactive run, use `pnpm exec eve dev` and paste the fixture into the TUI.

## Inspect the finished factory

The finished project is in the [`complete`](https://github.com/vercel/academy-starters/tree/main/creating-a-software-factory/complete) folder of `vercel/academy-starters`. Clone that repository separately to run it:

```bash
git clone https://github.com/vercel/academy-starters.git
cd academy-starters/creating-a-software-factory/complete
pnpm install
pnpm validate
pnpm trace
pnpm exec eve eval --list
```
