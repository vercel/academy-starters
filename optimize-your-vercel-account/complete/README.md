# Saturday — Completed

The Saturday app with every code-level lesson change applied. Reference implementation for the [Optimize Your Vercel Account](https://vercel.com/academy) course.

This repo is what you'd have at the end of the course, code-wise. The dashboard configurations (Fluid Compute toggle, Deployment Protection, Firewall rules, 2FA enforcement, etc.) are applied to the deployed project, not to the source tree.

## What's different from saturday-starter/

| File | What changed | Lesson |
|------|--------------|--------|
| `next.config.ts` | Added `images.formats` and `minimumCacheTTL` | 4.1 |
| `app/layout.tsx` | Added `<Analytics>` and `<SpeedInsights>` with sampling and admin filtering | 4.4 |
| `app/products/[slug]/page.tsx` | Set `quality={75}` and `sizes` on `<Image>` | 4.1 |
| `app/drops/page.tsx` | Replaced `revalidate = 60` with `'use cache'` + `cacheTag('drops')` | 3.3 |
| `app/api/stock-check/route.ts` | Wrapped warehouse fetch with `'use cache'` + `cacheTag('stock-${sku}')` + `cacheLife` | 3.2 |
| `app/api/drop-launch/route.ts` | `revalidateTag('drops')` replaces `revalidatePath('/drops')` | 3.3 |
| `ignore-build-step.sh` | New script for Vercel's Ignored Build Step | 4.3 |

Dashboard-only changes (no code diff) include:

- Sensitive `DROP_WEBHOOK_SECRET` env var (Lesson 2.1)
- Deployment Protection enabled for previews (Lesson 2.2)
- Custom firewall rule rate-limiting `/api/stock-check` (Lesson 2.3)
- Bot Protection in log mode (Lesson 2.4)
- Fluid Compute enabled (Lesson 3.1)
- 2FA enforcement (Lesson 5.1)
- Access Groups configured (Lesson 5.2)
- Deployment retention policy (Lesson 5.3)
- Enterprise: SAML, Audit Logs, Trusted IPs, Secure Compute, Managed Rules (Section 6)

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```
