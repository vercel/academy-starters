---
name: onboard-me
description: Guided onboarding tour of the Pretzel Logic codebase, structure first, then the three quirks that bite everyone once. Use when the user runs /onboard-me or asks for an onboarding tour of pretzel-logic.
---

Walk through the Pretzel Logic codebase in this order. Be conversational. Pause between sections and let the user steer.

1. **Project summary.** Read `README.md` and summarize what Pretzel Logic is in one or two sentences.

2. **Directory layout.** List the top-level folders (`app/`, `db/`, `lib/`, `config/`) and one sentence on what each is for.

3. **The data layer.** Walk through:
   - `db/schema.ts`, the BoxPlan model and what each column is for
   - `db/migrations/0001_rename_subscriptions_to_box_plans.sql`, surfacing the rename history (apply the `boxplan-history` skill)
   - `lib/db.ts`, how the Drizzle client is configured

4. **Salt levels.** Walk through `lib/constants.ts` and explain the lookup. Apply the `salt-level-lookup` skill. Point out the TODO in `app/plans/[slug]/page.tsx` as a real-world example of the gotcha.

5. **Shipping zones.** Walk through `config/shipping-zones.ts` and `app/shipping/[zone]/page.tsx`. Apply the `shipping-zones-buildtime` skill. Make sure the user understands that a new zone works in `next dev` but 404s in production until the next deploy.

6. **Hand-off.** End with: "That's the tour. What do you want to dig into first?"

Don't dump everything at once. After each numbered step, pause briefly so the user can ask questions. If they go quiet, move on.
