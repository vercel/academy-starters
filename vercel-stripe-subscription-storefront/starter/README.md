# Forager's Guild - Starter Template

A subscription-based field guide for wild edibles, mushrooms, and survival knowledge. This is the **starter template** - you'll implement the backend integrations throughout the course.

## What You'll Build

| Tier | Price | Access |
|------|-------|--------|
| **Scout** | Free | Basic plant ID, common edibles, public foraging map |
| **Ranger** | $9/mo | Mushroom database, seasonal guides, safe vs deadly comparisons |
| **Elder** | $29/mo | Full archive, medicinal uses, offline field guide, submit your own finds |

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Supabase](https://supabase.com) - Authentication & database
- [Stripe](https://stripe.com) - Payment processing & subscriptions
- [Tailwind CSS](https://tailwindcss.com) - Styling

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your keys (you'll get these during the course):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
```

### 3. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## What's Provided vs What You'll Build

### Already Built (UI & Theming)
- Landing page with guild branding
- Sign in/up pages
- Protected dashboard layout
- Field Guide card component
- Earthy forest color theme
- All UI components

### You'll Implement (TODOs)

| File | What to Implement |
|------|-------------------|
| `utils/supabase/server.ts` | Server-side Supabase client |
| `utils/supabase/client.ts` | Browser-side Supabase client |
| `utils/supabase/proxy.ts` | Session refresh and route protection |
| `app/actions.ts` | Auth actions (signIn, signUp, signOut) |
| `utils/stripe/server.ts` | Stripe checkout and subscription management |
| `app/api/field-guide/route.ts` | Subscription-gated API endpoint |

## Project Structure

```
app/
├── (auth)/              # Sign in/up pages
├── protected/           # Authenticated routes (show TODOs until implemented)
│   ├── page.tsx         # Account/profile
│   ├── pricing/         # Membership tiers
│   ├── subscription/    # Manage membership
│   └── paid-content/    # Field Guide (gated)
├── api/
│   └── field-guide/     # Foraging database API (TODO)
└── page.tsx             # Landing page

utils/
├── supabase/            # Supabase client setup (TODOs)
└── stripe/              # Stripe integration (TODOs)

components/
├── field-guide-card.tsx # Main feature component
├── header.tsx           # Navigation
├── protected-sidebar.tsx # Dashboard sidebar
└── ui/                  # Shared UI components
```

## Course Flow

1. **Set up Supabase** - Create project, configure auth
2. **Implement Supabase clients** - Server and browser clients
3. **Add auth actions** - Sign in, sign up, sign out
4. **Set up Stripe** - Products, prices, checkout
5. **Implement subscription management** - Cancel, reactivate
6. **Add subscription checking** - Gate premium content
7. **Complete the API route** - Serve foraging data to members

By the end, you'll have a fully functional subscription SaaS!
