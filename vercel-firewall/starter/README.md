# Claw & Order

The lobster roll truck from [Protect Your App on Vercel](https://vercel.com/academy/vercel-firewall) on Vercel Academy.

150 rolls a day. Preorders open at 11am. A rival truck, a preorder bot, and a fake-order bot would like a word.

## Run it

```bash
npm install
npm run dev
```

Then deploy it to your own Vercel account. The Firewall only sees traffic on a deployment.

## What's in here

| Path | What it is |
| --- | --- |
| `app/location` | Today's spot. The rival truck scrapes it. |
| `app/api/preorder` | Takes one of the day's 150 rolls. The preorder bot hammers it. |
| `app/api/order` | Office lunch orders. The fake-order bot fills it with junk. |
| `app/api/webhooks/payment` | Marks an order paid when TidePay (a made-up provider) says so. |
| `lib/store.ts` | Rolls and orders, kept in memory. A cold start resets the day. |
| `attack/` | Scripts that play the villains. See below. |

## The attack scripts

`attack/` holds small Node scripts that send traffic at **your own deployment** so you can watch the Firewall work. They have no dependencies.

Point them at a deployment you own and nothing else. Every mode is capped well below anything that looks like a real attack, and the course uses them as drills.

```bash
npm run scalper -- scrape   --target https://your-truck.vercel.app
npm run scalper -- preorder --target https://your-truck.vercel.app
npm run scalper -- order    --target https://your-truck.vercel.app
npm run scalper -- flood    --target https://your-truck.vercel.app
npm run lunch   --          --target https://your-truck.vercel.app
npm run webhook -- ord_1234abcd --target https://your-truck.vercel.app
```

Add `--disguise` to `scrape` to send a browser user agent.

## Note on state

Everything lives in memory, so the roll counter and orders reset whenever a function cold starts. That's a deliberate shortcut for a course about the Firewall. A real truck would use a database.

## Where the course has you edit

| File | Lesson |
| --- | --- |
| `components/preorder-form.tsx` | 3.1, 3.2 (Advanced) |
| `app/api/preorder/route.ts` | 3.2 (Advanced, Pro and Enterprise) |
| `instrumentation-client.ts` (you create it) | 4.3 (Advanced) |
| `app/api/order/route.ts` | 4.3 (Advanced) |

Everything else in the course happens in the Firewall dashboard and the `vercel firewall` CLI.
