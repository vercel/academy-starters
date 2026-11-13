---
name: shipping-zones-buildtime
description: Explains that config/shipping-zones.ts is locked into the production build. Use when the user edits shipping zones, asks about adding a zone, or reports /shipping routes that work locally but 404 on a deployment.
---

# Shipping zones are locked at build time

`config/shipping-zones.ts` exports the array that drives both the shipping rate calculator (`lib/shipping.ts`) and the static `/shipping/[zone]` routes.

The route file (`app/shipping/[zone]/page.tsx`) uses `generateStaticParams` and sets `dynamicParams = false`. In a production build, `generateStaticParams` runs once during `next build`, and `dynamicParams = false` makes every zone code outside that list return 404. In `next dev`, `generateStaticParams` runs again when you navigate to a route, so a new zone works locally right away.

## How to apply this

- **Adding a zone**: edit `config/shipping-zones.ts`, then **redeploy**. The deployed site serves the old list until a new build runs. Revalidation won't help, because ISR doesn't call `generateStaticParams` again.
- **Reading a zone's rate**: use `getShippingRate(code)` from `@/lib/shipping`. Never hardcode rates.
- **Debugging a 404**: if `/shipping/<code>` works in `next dev` but 404s on a deployment, that deployment was built before the zone existed. Redeploy. Clearing caches won't fix it.

## Why this matters

The dev server hides the problem. Because `next dev` reruns `generateStaticParams` on navigation, a zone added locally looks finished. The production build froze the list, and `dynamicParams = false` rejects anything missing from it. This has bitten on-call engineers more than once.

The canonical warning is in the file header comment at the top of `config/shipping-zones.ts`.
