---
description: Explain a Pretzel Logic file or concept with the right tribal-knowledge context applied.
---

When the user runs `/explain-this <file path or concept>`, do the following:

**If they named a file path:**

1. Read the file.
2. Summarize what it does in two or three sentences.
3. Apply any relevant skills:
   - References to `BoxPlan` or `subscriptions` → apply `boxplan-history`.
   - Uses of `saltLevel`, the integer salt values, or `SALT_LEVEL_NAMES` → apply `salt-level-lookup`.
   - Files in `config/` or anything touching `generateStaticParams` → apply `shipping-zones-buildtime` if relevant.
4. End by asking if they want to drill into a specific function or behavior.

**If they named a concept** (e.g. "salt levels", "shipping", "BoxPlan", "rename"):

1. Summarize the pattern in plain language.
2. Name the files that define it.
3. Offer to open one of them.

**If they ran the command with no argument:**

Ask: "What file or concept do you want explained?"

Keep responses short. Don't lecture. The goal is fast, accurate context, not an essay.
