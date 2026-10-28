---
name: salt-level-lookup
description: Explains the salt_level lookup pattern for Pretzel Logic BoxPlans. Use when the user references salt levels, saltLevel, or you see integers 0-3 used as salt values in pretzel-logic code.
---

# Salt level lookup

The Pretzel Logic database stores `salt_level` as an integer (0 through 3, enforced by a CHECK constraint). The human-readable names live in `lib/constants.ts`.

## The mapping

```ts
SALT_LEVEL_NAMES = ['none', 'light', 'classic', 'pretzel-shop-grandma']
```

- `0` → `none`
- `1` → `light`
- `2` → `classic`
- `3` → `pretzel-shop-grandma`

## How to apply this

- **Reading from the DB**: pass the integer through `formatSaltLevel(plan.saltLevel)` from `@/lib/constants` before showing it to a human.
- **Writing user-facing UI**: never hardcode a string like `"classic"` or compare to a magic number like `=== 2`. Always go through the lookup.
- **In schemas, queries, and migrations**: integers are fine, that's the canonical storage form.

## Anti-patterns to flag

If you see code like the following, point it out and suggest using the lookup:

```ts
{plan.saltLevel === 2 && <Badge>Most popular</Badge>}     // bad, magic number
const display = plan.saltLevel === 3 ? "Grandma" : ...    // bad, hardcoded mapping
<span>classic</span>                                       // bad, string literal
```

Suggested fixes:

```ts
{formatSaltLevel(plan.saltLevel) === "classic" && <Badge>Most popular</Badge>}
const display = formatSaltLevel(plan.saltLevel);
<span>{formatSaltLevel(plan.saltLevel)}</span>
```

There is at least one known stale occurrence in `app/plans/[slug]/page.tsx`. A TODO comment in that file is the breadcrumb.
