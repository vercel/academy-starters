import { DAILY_ROLLS, type RollStyle } from "./truck";

// Everything lives in memory. A cold start resets the truck to a full day of
// rolls and forgets every order. That's fine for a course about the Firewall,
// and wrong for a real truck.

let rollsLeft = DAILY_ROLLS;

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

const preorders: Preorder[] = [];
const orders = new Map<string, CateringOrder>();

export function getRollsLeft() {
  return rollsLeft;
}

export function takeRoll(input: Omit<Preorder, "confirmation">): Preorder | null {
  if (rollsLeft <= 0) return null;
  rollsLeft -= 1;
  const preorder = { ...input, confirmation: `CLAW-${String(DAILY_ROLLS - rollsLeft).padStart(3, "0")}` };
  preorders.push(preorder);
  return preorder;
}

export function createOrder(input: Omit<CateringOrder, "id" | "status">): CateringOrder {
  const order: CateringOrder = {
    ...input,
    id: `ord_${crypto.randomUUID().slice(0, 8)}`,
    status: "awaiting_payment",
  };
  orders.set(order.id, order);
  return order;
}

export function markOrderPaid(id: string): CateringOrder | null {
  const order = orders.get(id);
  if (!order) return null;
  order.status = "paid";
  return order;
}
