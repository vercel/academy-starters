# pretzel-onboarding

An [Agent Plugin](https://vercel.com/kb/guide/agent-plugins) that teaches your AI coding agent the tribal knowledge of the [Pretzel Logic](../pretzel-logic/) codebase.

This is the **completed reference plugin** for the Building Agent Plugins course on Vercel Academy. Students build this themselves across the four sections of the course. The version here is what they end up with.

## Layout

```
plugin.json        # Agent Plugins 1.0 manifest
mcp.json           # MCP servers
skills/            # One directory per skill, each with a SKILL.md
```

## What it knows

Three skills that fire when relevant:

- **`boxplan-history`**, the `subscriptions` → `box_plans` rename and why we did it
- **`salt-level-lookup`**, the integer salt level column and the lookup table everyone forgets
- **`shipping-zones-buildtime`**, `config/shipping-zones.ts` is locked into the production build, so new zones need a redeploy

## What it can do

Two workflow skills you run on purpose. Claude Code exposes plugin skills as slash commands:

- **`/pretzel-onboarding:onboard-me`**, guided tour of the codebase, applying the right skills at the right moments
- **`/pretzel-onboarding:explain-this <file-or-concept>`**, explain a specific file or pattern with tribal-knowledge context

## What it reads

One MCP server:

- **`github`**, GitHub's official MCP server in read-only mode, for reading the live repo (files, history, PRs). It runs from the `ghcr.io/github/github-mcp-server` image, so Docker must be running. It signs you in to GitHub with OAuth on first use. No token goes in the plugin.

## Installation

From the project where you want to use the plugin:

```bash
npx plugins add github:<your-github-handle>/pretzel-onboarding --client claude-code --scope project
```

Run `npx plugins clients` to see the other clients the CLI can install into.
