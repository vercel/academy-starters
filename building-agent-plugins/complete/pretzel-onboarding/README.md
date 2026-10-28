# pretzel-onboarding

An Open Plugin-format plugin that teaches your AI coding agent the tribal knowledge of the [Pretzel Logic](../pretzel-logic/) codebase.

This is the **completed reference plugin** for the Building Agent Plugins course on Vercel Academy. Students build this themselves across the four sections of the course. The version here is what they end up with.

## What it knows

Three skills that fire when relevant:

- **`boxplan-history`**, the `subscriptions` → `box_plans` rename and why we did it
- **`salt-level-lookup`**, the integer salt level column and the lookup table everyone forgets
- **`shipping-zones-buildtime`**, `config/shipping-zones.ts` is locked into the build, edit-and-redeploy required

## What it can do

Two slash commands:

- **`/onboard-me`**, guided tour of the codebase, applying the right skills at the right moments
- **`/explain-this <file-or-concept>`**, explain a specific file or pattern with tribal-knowledge context

## What it reads

One MCP server:

- **`github`**, the GitHub MCP server, for reading the live repo (history, issues, PRs). Requires a Personal Access Token in `GITHUB_TOKEN`.

## Installation

```bash
npx plugins add <your-github-handle>/pretzel-onboarding
```

Then set the token your agent's MCP loader will use:

```bash
export GITHUB_TOKEN="ghp_..."
```

The plugin works in Claude Code, Cursor, and any other Open Plugin-compatible host.
