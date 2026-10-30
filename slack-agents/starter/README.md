# Slack Agents on Vercel with the AI SDK: starter

> This is the starter for **[Slack Agents on Vercel with the AI SDK](https://vercel.com/academy/slack-agents)** on Vercel Academy. Start at [lesson 1.1, Project Setup](https://vercel.com/academy/slack-agents/sandbox-repo-setup-smoke-test).

## Run it locally

### Prerequisites

- Node.js 22 or later
- pnpm 10.34.9, from `packageManager` in `package.json`
- The [Slack CLI](https://docs.slack.dev/tools/slack-cli/) and a Slack workspace where you can install apps. A [developer sandbox](https://api.slack.com/developer-program) works.
- A Vercel account with AI Gateway access
- An [ngrok](https://ngrok.com) account, for the local tunnel

### Environment variables

There's no `.env.example`. Create a `.env` file in this folder with:

- `SLACK_BOT_TOKEN`: the Bot User OAuth Token from your Slack app's Install App tab.
- `SLACK_SIGNING_SECRET`: the Signing Secret from your Slack app's Basic Information tab. It verifies that requests come from Slack.
- `AI_GATEWAY_API_KEY`: authenticates the agent's model calls through AI Gateway. You can [create one in the dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys%3Futm_source%3Dai_gateway_landing_page&title=Get+an+API+Key).
- `NGROK_AUTH_TOKEN`: lets the dev tunnel forward Slack events to your machine. Find it in the [ngrok dashboard](https://dashboard.ngrok.com).

### Commands

```bash
pnpm install
slack run
```

`slack run` starts `pnpm dev:tunnel`, which runs the Nitro dev server behind an ngrok tunnel. The first time, link the app as described in [Link and run with the Slack CLI](#link-and-run-with-the-slack-cli).

## About this starter

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Facademy-starters%2Ftree%2Fmain%2Fslack-agents%2Fstarter&project-name=slack-agent-template&repository-name=slack-agent-template&env=SLACK_SIGNING_SECRET%2CSLACK_BOT_TOKEN&envDescription=These%20environment%20variables%20are%20required%20to%20deploy%20your%20Slack%20app%20to%20Vercel&envLink=https%3A%2F%2Fapi.slack.com%2Fapps)

This is a Slack Agent template built with Bolt for JavaScript (TypeScript), the AI SDK, and the Nitro server framework. It's the starter for the [Slack Agents on Vercel with the AI SDK](https://vercel.com/academy/slack-agents) course on Vercel Academy.

It began as a copy of [vercel-partner-solutions/slack-agent-template](https://github.com/vercel-partner-solutions/slack-agent-template) at commit `2c6a909`, the version the course lessons teach, and has since moved to AI SDK 7 and Bolt 5. It needs Node.js 22 or later.

Before getting started, make sure you have a development workspace where you have permissions to install apps. You can use a [developer sandbox](https://api.slack.com/developer-program) or [create a workspace](https://slack.com/create)

### Get the code

```bash
npx degit vercel/academy-starters/slack-agents/starter slack-agent && cd slack-agent && pnpm install
```

### Create a Slack App

1. Open https://api.slack.com/apps/new and choose "From an app manifest"
2. Choose the workspace you want to use
3. Copy the contents of [`manifest.json`](./manifest.json) into the text box that says "Paste your manifest code here" (JSON tab) and click Next
4. Review the configuration and click Create
5. On the Install App tab, click Install to <Workspace_Name>. 
      - You will be redirected to the App Configuration dashboard
6. Copy the Bot User OAuth Token into your environment as `SLACK_BOT_TOKEN`
7. On the Basic Information tab, copy your Signing Secret into your environment as `SLACK_SIGNING_SECRET`

### Link and run with the Slack CLI

1. In the terminal run `slack app link`
2. If prompted `update the manifest source to remote` select `yes`
3. Copy your App ID from the app you created
4. Select `Local` when prompted
5. Open `.slack/config.json` (the Slack CLI creates it when you link the app) and update your manifest source to `local`
```json
{
  "manifest": {
    "source": "local"
  },
  "project_id": "<project-id-added-by-slack-cli>"
}
```
6. Start your local server using `slack run`. If prompted, select the workspace you'd like to grant access to 
- Select `yes` if asked "Update app settings with changes to the local manifest?"
7. Open your Slack workspace and add your new Slack Agent to a channel. Your Slack Agent should respond whenever it's tagged in a message or sent a DM

## Deploy to Vercel

1. Create a new Slack app for production following the steps from above
2. Create a new Vercel project [here](https://vercel.com/new) and select this repo
3. Copy the Bot User OAuth Token into your Vercel environment variables as `SLACK_BOT_TOKEN`
4. On the Basic Information tab, copy your Signing Secret into your Vercel environment variables as `SLACK_SIGNING_SECRET`
5. When your deployment has finished, open your App Manifest from the Slack App Dashboard
6. Update the manifest so all the `request_url` and `url` fields use `https://<your-app-domain>/api/slack/events`
7. Click save and you will be prompted to verify the URL
8. Open your Slack workspace and add your new Slack Agent to a channel. Your Slack Agent should respond whenever it's tagged in a message or sent a DM
    - _Note_: Make sure you add the production app, not the local app we setup earlier
9. Your app will now automatically build and deploy whenever you commit to your repo. More information [here](https://vercel.com/docs/git)


## Project Structure

### [`manifest.json`](./manifest.json)

[`manifest.json`](./manifest.json) is a configuration for Slack apps. With a manifest, you can create an app with a pre-defined configuration, or adjust the configuration of an existing app.

### [`/server/app.ts`](./server/app.ts)

[`/app.ts`](./server/app.ts) is the entry point of the application. This file is kept minimal and primarily serves to route inbound requests.

### [`/server/listeners`](./server/listeners)

Every incoming request is routed to a "listener". Inside this directory, we group each listener based on the Slack Platform feature used, so [`/listeners/shortcuts`](./server/listeners/shortcuts/index.ts) handles incoming [Shortcuts](https://api.slack.com/interactivity/shortcuts) requests, [`/listeners/views`](./server/listeners/views/index.ts) handles [View submissions](https://api.slack.com/reference/interaction-payloads/views#view_submission) and so on.

### [`/server`](./server)

This is your nitro server directory. Inside you have an [`api`](./server/api) folder that contains a [`events.post.ts`](./server/api/slack/events.post.ts) file. This matches the request URL's defined in your [`manifest.json`](./manifest.json) file. Nitro uses file based routing for incoming requests. You can learn more about this [here](https://nitro.build/guide/routing).