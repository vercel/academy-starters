---
name: boxplan-history
description: Explains the BoxPlan rename in the Pretzel Logic codebase. Use when the user mentions BoxPlan, subscription, plan tiers, or you encounter the word "subscription" in pretzel-logic files.
---

# BoxPlan history

The `box_plans` table used to be called `subscriptions`.

## What happened

In Q3 2024, we renamed the `subscriptions` table to `box_plans`. The reason: marketing kept confusing it with Stripe subscription objects in shared docs, and at least two engineering tickets got routed to the wrong team because of the name collision.

The migration that performed the rename is at `db/migrations/0001_rename_subscriptions_to_box_plans.sql`. The original create migration is `0000_create_subscriptions.sql`. The two files in sequence are the receipts.

## How to apply this

- **In new code**: use `BoxPlan` everywhere. The TypeScript type is `BoxPlan` from `db/schema.ts`. The DB table is `box_plans`. The slug pattern is `box-plan-*`.
- **In existing code**: if you see `subscription` referring to a plan tier (not a Stripe subscription), flag it as a legacy reference. PR descriptions and code comments still leak the old name. Don't change function signatures without checking call sites, but do flag stale comments.
- **When users ask "what is BoxPlan?"**: explain the table and tell them about the rename. Don't pretend the name has always been BoxPlan.

## Verification

If you have access to the GitHub MCP server, fetch the rename migration directly. The repo owner and name are the ones the user is working in, derive them from the working directory's `git remote get-url origin` if you're unsure.

The path is `db/migrations/0001_rename_subscriptions_to_box_plans.sql`, and the comment at the top of that file is the canonical source for the rename story.
