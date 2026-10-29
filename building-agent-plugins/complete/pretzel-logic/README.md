# Pretzel Logic

A monthly pretzel subscription service that exists primarily so we can put it in an agent's onboarding plugin and watch the agent learn things it shouldn't have to ask about.

This is the **target codebase** for the [Building Agent Plugins](../../) course on Vercel Academy. You won't modify Pretzel Logic. You'll point a plugin at it.

## What's in here

A small Next.js storefront with three load-bearing quirks the plugin will teach the agent about:

1. **The BoxPlan rename.** The `box_plans` table used to be `subscriptions`. The migration files tell the story.
2. **The salt level lookup.** The DB stores `salt_level` as 0 to 3. Names live in `lib/constants.ts`. Don't hardcode.
3. **Build-time shipping zones.** `config/shipping-zones.ts` feeds `generateStaticParams`, and `dynamicParams = false` rejects anything else. A new zone works in `next dev` but 404s in production until you redeploy.

Each of these gets a SKILL.md file in the plugin you build.

## Do you need to run this?

Probably not. The course is about authoring a plugin that points at this codebase's *source files*. Your AI coding agent reads the code via MCP, it doesn't need a running dev server.

If you do want to run it (to see the storefront, exercise the routes, mess around), here's the setup.

## Optional: run it locally

1. **Get a Neon database.** Free tier at https://neon.tech is fine. Create a project, copy the connection string.

2. **Set the environment variable.**

   ```bash
   cp .env.example .env.local
   ```

   Paste your connection string into `.env.local`.

3. **Install, migrate, seed, start.**

   ```bash
   pnpm install
   pnpm db:migrate
   pnpm db:seed
   pnpm dev
   ```

4. Open http://localhost:3000.

If something doesn't work, the codebase quirks above are probably to blame. That's the point, the plugin is here to help.
