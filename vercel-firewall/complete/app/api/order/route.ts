import { checkBotId } from "botid/server";
import { createOrder } from "@/lib/store";

// Verified bots we'll take lunch orders from. Names come from Vercel's
// verified bots directory: https://vercel.com/docs/bot-management#verified-bots-directory
const WELCOME_BOTS = ["chatgpt-operator"];

export async function POST(request: Request) {
  // Locally, BotID calls everyone human. Set BOTID_DEV_BYPASS=BAD-BOT (or
  // GOOD-BOT) in .env.local to try the other branches without deploying.
  const verification = await checkBotId({
    developmentOptions: {
      bypass: process.env.BOTID_DEV_BYPASS as "HUMAN" | "BAD-BOT" | "GOOD-BOT" | undefined,
    },
  });

  const botName = "verifiedBotName" in verification ? verification.verifiedBotName : undefined;
  const welcomeBot = verification.isVerifiedBot && botName !== undefined && WELCOME_BOTS.includes(botName);

  if (verification.isBot && !welcomeBot) {
    return Response.json({ error: "We couldn't tell you from a bot. Try again from the order page." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const rolls = Number(body?.rolls);
  const pickup = typeof body?.pickup === "string" ? body.pickup : "";

  if (!name || !email.includes("@") || !Number.isInteger(rolls) || rolls < 5 || rolls > 40 || !pickup) {
    return Response.json({ error: "Name, email, 5 to 40 rolls, and a pickup time, please." }, { status: 400 });
  }

  const placedBy = welcomeBot && botName ? botName : "customer";
  const order = createOrder({ name, email, rolls, pickup, placedBy });
  return Response.json({ id: order.id, status: order.status, placedBy: order.placedBy }, { status: 201 });
}
