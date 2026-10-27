import { generateText } from "ai";
import { MENU, TRUCK_INSTRUCTIONS } from "../lib/menu";

// Recording prep, not a lesson script. The observability lessons (3.1, 3.5)
// and the budget dashboard (2.5) only look real if there's traffic behind
// them, so this seeds a lunch rush: mostly order chat on the cheap fast
// model, occasional daily specials on the pricier one, everything tagged
// for Custom Reporting. Run it the morning before recording, and again the
// next couple of mornings so the charts show day-over-day history.
//
//   pnpm seed-traffic        # 12 rounds (~16 requests)
//   pnpm seed-traffic 30     # bigger rush

const rounds = Number(process.argv[2] ?? 12);

const customers = [
  "customer-107",
  "customer-482",
  "customer-233",
  "customer-961",
  "customer-350",
];

const orders = [
  "Two Al Pastor Meteor and an agua fresca, please. Confirm with total.",
  "One Birria Eclipse. Do I really need the napkins? Confirm with total.",
  "Three Hongos Humildes, no queso. Confirm with total.",
  "Camarón Cañón — is it Friday? If yes, two. If not, what's closest?",
  "One of everything on the sides list. Confirm with total.",
  "Carnitas Quietas and a Jarritos. What flavor aguas do you have today?",
  "Is La Consecuencia available by the cup? Asking for a friend.",
  "Two Birria Eclipse, one Elote Clásico, and change for a twenty. Total?",
];

const specials = [
  "Today's special is the Birria Eclipse. Three-sentence sidewalk sign that makes people cross the street.",
  "Today's special is the Hongos Humildes. Three-sentence sidewalk sign. The mushrooms are humble; the sign should not be.",
  "Today's special is the Camarón Cañón. Three-sentence sidewalk sign. It is, in fact, Friday.",
];

let orderCount = 0;
let specialCount = 0;
let failures = 0;

for (let i = 0; i < rounds; i++) {
  const user = customers[i % customers.length];
  try {
    await generateText({
      model: "openai/gpt-5.4-mini",
      instructions: TRUCK_INSTRUCTIONS,
      prompt: orders[i % orders.length],
      providerOptions: {
        gateway: { user, tags: ["feature:order-chat"] },
      },
    });
    orderCount++;
    console.log(`order-chat    ${user}  (${i + 1}/${rounds})`);

    // The specials run roughly one round in three: occasional and pricier,
    // which is exactly the contrast the spend dashboards need.
    if (i % 3 === 0) {
      await generateText({
        model: "anthropic/claude-sonnet-4.6",
        prompt: `${specials[specialCount % specials.length]}\n\nReference the menu for tone; do not invent prices.\n\n${MENU}`,
        providerOptions: {
          gateway: { user: "sign-bot", tags: ["feature:daily-special"] },
        },
      });
      specialCount++;
      console.log(`daily-special sign-bot`);
    }
  } catch (err) {
    failures++;
    console.log(`skipped a round: ${err instanceof Error ? err.message : err}`);
  }
}

console.log("---");
console.log(`Seeded ${orderCount} order-chat + ${specialCount} daily-special requests` +
  (failures ? ` (${failures} failed)` : ""));
console.log("Dashboards update within a few minutes; Custom Reporting rows can lag a little longer.");
