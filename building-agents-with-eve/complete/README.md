# Building Agents with eve: complete

> This is the finished app for **[Building Agents with eve](https://vercel.com/academy/building-agents-with-eve)** on Vercel Academy. Use it to check your work as you go through the course.

## Run it locally

### Prerequisites

- Node.js 24 (`engines` asks for `24.x`, and `.nvmrc` pins `24`)
- npm, to match the `package-lock.json` in this folder
- A Vercel account with AI Gateway access, for the model connection

### Environment variables

There's no `.env.example`. The agent needs a model connection, and eve stores that for you:

- Run `/login` inside the terminal UI, or set `AI_GATEWAY_API_KEY` in your shell. eve keeps logins in your operating system's secret store, not in a project file.
- `SLACK_CONNECTOR` (optional): the Vercel Connect client UID for the Slack channel. See [Web and deployment](#web-and-deployment).

### Commands

```bash
npm install
npm run dev:eve
```

`npm run dev:eve` opens the eve terminal UI. Run `npm run dev` instead for the Next.js dashboard.

## Spoke & Mirror Cyclery

A sample [Eve](https://eve.dev) agent: the front desk at **Spoke & Mirror Cyclery**.
Customers describe what their bike is doing, the agent diagnoses, quotes from a real
catalog, and books a slot. It's a small app that exercises every core Eve primitive
used in the course, plus a Next.js dashboard and an optional Slack channel backed by
Vercel Connect.

## What it demonstrates

| Primitive            | Where                                   | What it does                                              |
| -------------------- | --------------------------------------- | --------------------------------------------------------- |
| Agent + persona      | `agent/agent.ts`, `agent/instructions.md` | Model config and the standing front-desk identity.    |
| Tools                | `agent/tools/*.ts`                      | Look up services, check openings, book repairs.           |
| State                | `agent/lib/garage.ts`                   | Remembers the customer's bikes across turns.              |
| Human-in-the-loop    | `agent/tools/book_repair.ts`            | Parks for approval when the quote tops $150.              |
| Dynamic skill        | `agent/skills/shop-playbook.ts`         | Loads a member/pro playbook from the caller's `tier`.     |
| Channel auth         | `agent/channels/eve.ts`                 | Stamps the `tier` claim the skill reads.                  |
| Web dashboard        | `app/`                                  | Streams sessions through Eve's current React API.         |
| Slack channel        | `agent/channels/slack.ts`                | Receives mentions and replies through Vercel Connect.     |
| Sandbox seed         | `agent/sandbox/workspace/torque-specs.md` | Reference file mounted into `/workspace`.               |

## Things to try

**Plain Q&A → tool loop**

> My commuter's rear brake feels spongy. What do you recommend and what's it cost?

Watch it call `lookup_service`, land on the Hydraulic Brake Bleed, and quote a real price.

**Persistent state**

> It's a Surly Disc Trucker, 700c. Save it as "the commuter".
>
> *(new turn)* Book the brake bleed for it.

The second turn still knows the bike. State checkpoints at step boundaries.

**Human-in-the-loop**

> Book the Full Overhaul for Tue 10am.

The $180 quote trips `approval`. The turn parks on an approve/deny prompt and
resumes from exactly that step once you answer.

**Dynamic skill (per tier)**

`eve dev` authenticates via `localDev()`, which sets no `tier`, so you get the plain
desk. To see the member/pro playbook over HTTP, send a demo customer cookie such as
`shop_session=demo-member` or `shop_session=demo-pro`. The server-side customer record,
not a caller-controlled tier header, supplies the claim.

## Web and deployment

Run `npm run dev` for the included Next.js dashboard. When the project and production
credentials are ready, deploy the complete app with `npx eve deploy`.

The Slack channel expects `SLACK_CONNECTOR` to contain the Vercel Connect client UID.
It falls back to the course's `slack/spoke-and-mirror` example. Slack authentication
provides Slack identity, not a shop membership tier; add a trusted server-side mapping
if Slack customers should receive member or pro behavior.
