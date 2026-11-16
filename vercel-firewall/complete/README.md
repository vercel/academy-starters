# Claw & Order

The lobster roll truck from [Protect Your App on Vercel](https://vercel.com/academy/vercel-firewall) on Vercel Academy.

150 rolls a day. Preorders open at 11am. A rival truck, a preorder bot, and a fake-order bot would like a word.

## Run it

```bash
npm install
vercel link
vercel install upstash/upstash-kv
npm run dev
```

`vercel install upstash/upstash-kv` adds a free Upstash Redis database to your project and pulls its credentials into `.env.local`. Then deploy it to your own Vercel account. The Firewall only sees traffic on a deployment.

## What's in here

| Path | What it is |
| --- | --- |
| `app/location` | Today's spot. The rival truck scrapes it. |
| `app/api/preorder` | Takes one of the day's 150 rolls. The preorder bot hammers it. |
| `app/api/order` | Office lunch orders. The fake-order bot fills it with junk. |
| `app/api/webhooks/payment` | Marks an order paid when TidePay (a made-up provider) says so. |
| `lib/store.ts` | Rolls and orders, kept in Upstash Redis so every function sees the same truck. |
| `attack/` | Scripts that play the villains. See below. |

## The attack scripts

`attack/` holds small Node scripts that send traffic at **your own deployment** so you can watch the Firewall work. They have no dependencies. `restock` is the odd one out: it runs on your machine and puts 150 rolls back on the truck, using the credentials in `.env.local`.

Point them at a deployment you own and nothing else. Every mode is capped well below anything that looks like a real attack, and the course uses them as drills.

```bash
npm run scalper -- scrape   --target https://your-truck.vercel.app
npm run scalper -- preorder --target https://your-truck.vercel.app
npm run scalper -- order    --target https://your-truck.vercel.app
npm run scalper -- flood    --target https://your-truck.vercel.app
npm run lunch   --          --target https://your-truck.vercel.app
npm run webhook -- ord_1234abcd --target https://your-truck.vercel.app
npm run restock
```

Add `--disguise` to `scrape` to send a browser user agent.

## Note on state

The roll counter and orders live in Redis. They have to: on Vercel, the home page, the preorder route, and the payment webhook can run in different function instances, and an in-memory counter would give each one its own 150 rolls. Orders expire after a day. Rolls stay sold until you run `npm run restock`.
