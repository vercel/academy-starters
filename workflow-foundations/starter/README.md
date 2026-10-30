# Build Durable Workflows: starter

> This is the starter for **[Build Durable Workflows](https://vercel.com/academy/workflow-foundations)** on Vercel Academy. Start at [lesson 1.1, Set up the tracker](https://vercel.com/academy/workflow-foundations/set-up-the-pizza-tracker).

## Run it locally

### Prerequisites

- Node.js 20.9 or later, the minimum for Next.js 16 (`package.json` doesn't pin a version)
- pnpm. This folder has no lockfile, and the course uses pnpm.
- A [Resend](https://resend.com) account for the order emails
- A Vercel account, for deploying in lesson 1.4

### Environment variables

Copy `.env.local.example` to `.env.local`, then fill in:

- `RESEND_API_KEY`: sends the order confirmation and review request emails. Create one at [resend.com/api-keys](https://resend.com/api-keys).

### Commands

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Pizza Tracker

The course's pizza order tracker, before any workflow code.

## What's already here

- The customer order form (`app/page.tsx`)
- Kitchen and driver ops pages (buttons will 404 until you wire up the API routes in Section 3)
- The order status page (`app/orders/[runId]/page.tsx`)
- A stub `/api/orders` route that stores the order locally and returns a fake run ID

## What you'll build

- Wrap `next.config.ts` with `withWorkflow` (Lesson 1.1)
- Steps in `workflows/steps/` starting with `sendOrderConfirmation` (Lesson 1.2)
- The `processOrder` workflow (Lesson 1.3)
- API routes to resume hooks (`/api/kitchen/ready`, `/api/driver/pickup`, `/api/driver/delivered`)

Each lesson tells you exactly what to add.
