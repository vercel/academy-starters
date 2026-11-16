import { Redis } from "@upstash/redis";
import { DAILY_ROLLS, type RollStyle } from "./truck";

// Rolls and orders live in Upstash Redis so every function sees the same truck.
// The home page, the preorder route, and the payment webhook can each run in a
// different instance, and an in-memory counter would give each one its own
// 150 rolls. `npm run restock` resets the day (see attack/restock.mjs).

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

// False until `vercel install upstash` adds the credentials and the site is
// deployed again. The pages show setup steps instead of crashing.
export const storeReady = Boolean(REDIS_URL && REDIS_TOKEN);

let client: Redis | undefined;
function redis() {
  client ??= new Redis({ url: REDIS_URL, token: REDIS_TOKEN });
  return client;
}

// attack/restock.mjs deletes these two keys. Keep the names in sync.
const ROLLS_SOLD = "truck:rolls-sold";
const PREORDERS = "truck:preorders";

const ORDER_TTL_SECONDS = 60 * 60 * 24;

export type Preorder = {
  confirmation: string;
  name: string;
  phone: string;
  style: RollStyle;
};

export type CateringOrder = {
  id: string;
  name: string;
  email: string;
  rolls: number;
  pickup: string;
  status: "awaiting_payment" | "paid";
  placedBy: string;
};

export async function getRollsLeft() {
  const sold = (await redis().get<number>(ROLLS_SOLD)) ?? 0;
  return Math.max(0, DAILY_ROLLS - sold);
}

// INCR is atomic, so two preorders can never get the same roll. Once the count
// passes DAILY_ROLLS, every later preorder is sold out.
export async function takeRoll(
  input: Omit<Preorder, "confirmation">,
): Promise<{ preorder: Preorder; rollsLeft: number } | null> {
  const sold = await redis().incr(ROLLS_SOLD);
  if (sold > DAILY_ROLLS) return null;

  const preorder = { ...input, confirmation: `CLAW-${String(sold).padStart(3, "0")}` };
  await redis().hset(PREORDERS, { [preorder.confirmation]: preorder });
  return { preorder, rollsLeft: DAILY_ROLLS - sold };
}

export async function createOrder(input: Omit<CateringOrder, "id" | "status">): Promise<CateringOrder> {
  const order: CateringOrder = {
    ...input,
    id: `ord_${crypto.randomUUID().slice(0, 8)}`,
    status: "awaiting_payment",
  };
  await redis().set(`order:${order.id}`, order, { ex: ORDER_TTL_SECONDS });
  return order;
}

export async function markOrderPaid(id: string): Promise<CateringOrder | null> {
  const key = `order:${id}`;
  const order = await redis().get<CateringOrder>(key);
  if (!order) return null;

  const paid = { ...order, status: "paid" as const };
  await redis().set(key, paid, { keepTtl: true });
  return paid;
}
