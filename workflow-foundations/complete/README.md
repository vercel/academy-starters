# Build Durable Workflows: complete

> This is the finished app for **[Build Durable Workflows](https://vercel.com/academy/workflow-foundations)** on Vercel Academy. Use it to check your work as you go through the course.

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

In another terminal, open the local workflow dashboard:

```bash
pnpm workflow:web   # local dashboard at http://localhost:3700
```

Then open http://localhost:3000 and place a pizza order. `.env.example` holds the same variable with a comment, if you prefer that file.

## Pizza Tracker

The reference implementation of the course's pizza tracker.

## Pages

- `/`: Customer order form
- `/orders/[runId]`: Order status page (polls workflow state)
- `/kitchen`: Kitchen ops (mark orders as ready)
- `/driver`: Driver ops (pickup + delivered)

## Workflow Steps

1. `chargeCard`: Fake payment, throws `FatalError` if the last 4 ends in `0000`
2. `sendOrderConfirmation`: Resend email
3. `acknowledgeKitchen`: Flaky (throws ~30% to demo retries)
4. Wait on `kitchen:{orderId}` hook (with 20-minute timeout)
5. `dispatchDelivery`: Driver assignment
6. Wait on `driver-pickup:{orderId}` hook
7. Wait on `driver-delivered:{orderId}` hook
8. `sendReviewRequest`: Resend email
