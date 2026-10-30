# Optimize Your Vercel Account: complete

> This is the finished app for **[Optimize Your Vercel Account](https://vercel.com/academy/optimize-your-vercel-account)** on Vercel Academy. Use it to check your work as you go through the course.

## Run it locally

### Prerequisites

- Node.js 22 or later. `package.json` doesn't pin a version; the course asks for 22.
- npm. This folder ships without a lockfile, so Vercel installs with npm too.
- A Vercel account

### Environment variables

Copy `.env.example` to `.env.local`, then fill in:

- `DROP_WEBHOOK_SECRET`: validates incoming requests to the drop-launch webhook at `/api/drop-launch`. Any long random string works locally. Lesson 2.1 stores it on Vercel as a Secret.

### Commands

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Saturday, completed

The Saturday app with every code-level lesson change applied. Reference implementation for the [Optimize Your Vercel Account](https://vercel.com/academy/optimize-your-vercel-account) course.

This folder is what you'd have at the end of the course, code-wise. The dashboard configurations (Fluid Compute toggle, Deployment Protection, Firewall rules, 2FA enforcement, etc.) are applied to the deployed project, not to the source tree.

## What's different from `starter/`

| File | What changed | Lesson |
|------|--------------|--------|
| `next.config.ts` | Added `images.formats` and `minimumCacheTTL` | 4.1 |
| `app/layout.tsx` | Added `<Analytics>` and `<SpeedInsights>` with sampling | 4.4 |
| `app/analytics.tsx` | New Client Component that wraps Vercel Analytics and filters out `/admin` events | 4.4 |
| `app/products/[slug]/page.tsx` | Set `quality={75}` and `sizes` on `<Image>` | 4.1 |
| `app/drops/page.tsx` | Replaced `revalidate = 60` with `'use cache'` + `cacheTag('drops')` | 3.3 |
| `app/page.tsx` | Moved the next-drop banner behind `<Suspense>` | 3.2 |
| `app/api/stock-check/route.ts` | Wrapped warehouse fetch with `'use cache: remote'` + `cacheTag('stock-${sku}')` + `cacheLife` | 3.2 |
| `app/api/drop-launch/route.ts` | `revalidateTag('drops', 'max')` replaces `revalidatePath('/drops')` | 3.3 |
| `ignore-build-step.sh` | New script for Vercel's Ignored Build Step | 4.3 |

Dashboard-only changes (no code diff) include:

- `DROP_WEBHOOK_SECRET` stored as a Secret with a separate Production value, plus the Separate Production Secret Values team policy (Lesson 2.1)
- Deployment Protection enabled for previews (Lesson 2.2)
- Custom firewall rule rate-limiting `/api/stock-check` (Lesson 2.3)
- Bot Protection in log mode (Lesson 2.4)
- Fluid Compute enabled (Lesson 3.1)
- 2FA enforcement (Lesson 5.1)
- Access Groups configured (Lesson 5.2)
- Deployment retention policy (Lesson 5.3)
- Enterprise: SAML, Audit Logs, Trusted IPs, Secure Compute, Managed Rules (Section 6)
