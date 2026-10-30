# Build Visual Workflow Plugins on Vercel: starter

> This is the starter for **[Build Visual Workflow Plugins on Vercel](https://vercel.com/academy/visual-workflow-builder-on-vercel)** on Vercel Academy. Start at [lesson 1, Hello Workflow](https://vercel.com/academy/visual-workflow-builder-on-vercel/hello-workflow).

## Run it locally

### Prerequisites

- Node.js 22 or later. `package.json` doesn't pin a version, and some dependencies need 22.
- pnpm, to match the `pnpm-lock.yaml` in this folder
- A Vercel account and the Vercel CLI (`npm i -g vercel`)
- A Postgres database. The course's deploy button provisions one on Neon, or you can run one locally with `docker compose up -d`.

### Environment variables

Deploy with the button in lesson 1 first, then link this folder and pull the project's variables into `.env.local`:

```bash
vercel link
vercel env pull .env.local
```

`.env.example` lists what the app reads:

- `DATABASE_URL`: the Postgres connection string. It should start with `postgres://` or `postgresql://`.
- `BETTER_AUTH_SECRET`: signs auth sessions. Generate one with `openssl rand -base64 32`.
- `RESEND_API_KEY` (optional): powers the email plugin.

### Commands

```bash
pnpm install
pnpm db:push
pnpm dev
```

`pnpm db:push` creates the tables the app needs. Open [http://localhost:3000](http://localhost:3000).

## Visual Workflow Builder

A visual workflow builder for learning durable workflow patterns on Vercel.

## What You'll See

- **Visual workflow canvas**: Drag-and-drop nodes connected by edges
- **Sample workflows**: "Hello Workflow" and "Data Pipeline" load automatically on first visit
- **Execution logs**: Watch each step run with timing and output

## Run the Workflow

1. Open the app
2. See the seeded workflow on the canvas
3. Click **Run** to execute
4. Watch the logs show step-by-step execution

## Development Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Run production migrations, discover plugins, then build
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Drizzle Studio
```

## Learn More

- [Workflow SDK documentation](https://workflow-sdk.dev/docs/introduction)
