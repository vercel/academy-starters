---
name: shipping-zones-buildtime
description: Explains that config/shipping-zones.ts is read at build time and dev edits do not take effect until rebuild. Use when the user edits shipping zones, asks about adding a zone, or reports unexpected 404s at /shipping routes.
---

# Shipping zones are locked at build time

`config/shipping-zones.ts` exports the array that drives both the shipping rate calculator (`lib/shipping.ts`) and the static `/shipping/[zone]` routes.

The route file (`app/shipping/[zone]/page.tsx`) uses `generateStaticParams` and sets `dynamicParams = false`. Both choices mean the list of zones is baked into the build output. Editing the array in dev does **not** add or remove routes.

## How to apply this

- **Adding a zone**: edit `config/shipping-zones.ts`, then **rebuild**. In production, that means redeploying. Locally, that means restarting `next dev` (which re-evaluates `generateStaticParams`).
- **Reading a zone's rate**: use `getShippingRate(code)` from `@/lib/shipping`. Never hardcode rates.
- **Suspecting a stale build**: if a newly-added zone returns 404 from `/shipping/<code>`, the build is stale.

## Why this matters

In a typical Next.js app, file edits during `next dev` show up immediately. This file is the exception. The combination of:

1. `generateStaticParams` reads `SHIPPING_ZONES` at build time
2. `dynamicParams = false` rejects any zone code not in the build manifest

…means the dev server can be running stale params even while the rest of the app updates. This has bitten on-call engineers more than once.

The canonical warning is in the file header comment at the top of `config/shipping-zones.ts`.
