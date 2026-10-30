# Make Decisions with Jev: complete

> This is the finished app for **[Make Decisions with Jev](https://vercel.com/academy/make-decisions-with-jev)** on Vercel Academy. Use it to check your work as you go through the course.

## Run it locally

### Prerequisites

- Node.js 22 or later. `package.json` doesn't pin a version, and some dependencies need 22.
- pnpm, to match the `pnpm-lock.yaml` in this folder
- A Vercel account with AI Gateway access to `typesafe-ai/jev` and `openai/gpt-5.6-luna-fast`
- A Resend account, only if you want email delivery

### Environment variables

Copy `.env.example` to `.env.local`, then fill in:

- `AI_GATEWAY_API_KEY`: authenticates the routing calls. Create a [Vercel AI Gateway key](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fai-gateway%2Fapi-keys), or skip it and use Vercel OIDC with `vercel link` and `vercel env pull .env.local`.
- `RESEND_API_KEY` (optional): sends routed submissions by email. The setup is under **Optional email delivery** in [How Routing Works](#how-routing-works).
- `RESEND_FROM` (optional): the sender address, on a domain you've verified in Resend.

Without AI Gateway access, you can still explore the forms and load sample inputs. Routing a submission makes live model calls.

### Commands

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The home page redirects to `/leads`.

| Example | Route | Routes to |
| --- | --- | --- |
| Lead | `/leads` | Startup, growth, enterprise, or sales teams |
| Contact | `/contact` | Billing, support, or general inquiries |
| Issue Report | `/issues` | Frontend, platform, infrastructure, identity, or engineering teams |

## Jev x AI SDK Form Router

This copy contains the mini class's cancellation-policy exercise. See [COURSE.md](./COURSE.md) for the changes and walkthrough.

Three forms use [Jev](https://vercel.com/i/what-is-jev) to route submissions by context, with `openai/gpt-5.6-luna-fast` handling uncertain or failed evaluations. Includes editable samples, routing details, and optional email delivery.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Facademy-starters%2Ftree%2Fmain%2Fmake-decisions-with-jev%2Fcomplete&project-name=jev-form-router&repository-name=jev-form-router)

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 and React 19 | App Router, shared form UI, and Server Actions |
| AI SDK 7 and Vercel AI Gateway | Typed model calls and provider access |
| shadcn/ui, Base UI, and Tailwind CSS 4 | Components and styling |
| React Email and Resend | Email previews and optional delivery |

## How Routing Works

1. Zod validates the submission against the fields in [lib/examples.ts](lib/examples.ts).
2. Jev decides on the complete submission using AI SDK’s `experimental_decide` and selects an allowed team/specialty combination.
3. The app accepts Jev’s choice when its confidence is **at least 95%**.
4. If confidence is lower, missing, or invalid, or Jev fails, `openai/gpt-5.6-luna-fast` independently evaluates the same submission and criteria using `generateText` and `Output.object`. Its choice becomes final.
5. The result includes the destination, deciding model, Jev statistics, model timings, and an email preview.

**Confidence and selected-option probability are separate metrics.** The threshold uses the unrounded value of `providerMetadata.typesafe.confidence.destination`. Jev’s displayed statistics remain attached to its original evaluation when the fallback model makes the final decision.

Provider calls have bounded timeouts and one transient retry. If both models fail, the app returns a retryable error and sends no email.

<details>
<summary>Optional email delivery</summary>

**Set up Resend through Vercel Marketplace**

The [Resend Marketplace integration](https://resend.com/docs/guides/vercel-marketplace-integration) creates a Resend account and connects it to your Vercel project. During setup, you can select an existing Vercel domain or purchase one.

1. If you haven't already, install the Vercel CLI and link the project:

   ```sh
   npm install --global vercel
   vercel link
   ```

2. Start the integration setup:

   ```sh
   vercel i resend
   ```

3. Select an existing domain or purchase one through Vercel, then choose a plan and connect your project. Complete onboarding in Resend, choose **Auto configure** to add the DNS records, and wait for domain verification.
4. Pull the integration's environment variables for local development:

   ```sh
   vercel env pull .env.local
   ```

5. Confirm `RESEND_API_KEY` is present and set `RESEND_FROM` in `.env.local` to a sender address on your verified domain.

If you already have a Resend account, you can instead set `RESEND_API_KEY` and `RESEND_FROM` directly using your existing API key and a [verified domain](https://resend.com/docs/dashboard/domains/introduction).

**Configure receiving inboxes**

In [lib/recipients.ts](lib/recipients.ts), replace `null` with a valid inbox for every destination on the form you want to enable. Multiple destinations can share an inbox.

An unchecked **Email the receiving team** checkbox appears on configured forms.

Recipient keys are derived from the destination registry and checked by TypeScript. Addresses stay server-side. The validated submitter email becomes `replyTo`. Forms with unconfigured inboxes continue to provide previews.

Email failures preserve the routing result. Resend acceptance does not confirm inbox delivery. If a connection drops after an opted-in submission, check Resend before resubmitting.

</details>

## Customization

| File | What to change |
| --- | --- |
| [lib/examples.ts](lib/examples.ts) | Form fields, samples, destinations, and routing criteria |
| [lib/router.ts](lib/router.ts) | Models, confidence threshold, timeouts, and fallback policy |
| [lib/recipients.ts](lib/recipients.ts) | Receiving inboxes |
| [lib/submission.ts](lib/submission.ts) | Validation, email rendering, and delivery workflow |
| [components/router-form.tsx](components/router-form.tsx) and [components/routing-result.tsx](components/routing-result.tsx) | Shared form and result UI |
| [emails/routed-submission.tsx](emails/routed-submission.tsx) | Email design |

Keep the experimental AI SDK version pinned and rerun the checks when upgrading it.

## Checks

```sh
pnpm fix       # Format and apply lint fixes
pnpm validate  # Lint, type check, Knip, and tests
pnpm build     # Production build
```

Tests mock the model providers and Resend. They make no external calls. Coverage includes confidence thresholds, fallback decisions, validation, recipient configuration, and delivery retries.

## Resources

- [Jev documentation](https://docs.typesafe.ai/introduction)
- [Jev and AI SDK guide](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk)
- [AI SDK decisions](https://ai-sdk.dev/docs/ai-sdk-core/decisions)
- [React Email](https://react.email/docs/introduction)
