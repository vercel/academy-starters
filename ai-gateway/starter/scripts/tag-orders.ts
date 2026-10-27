import { gateway, generateText } from "ai";
import { MENU } from "../lib/menu";

// Two features, two customers, all tagged. This is what makes
// "who is spending the money" answerable later.
const requests = [
  { user: "customer-482", tags: ["feature:order-chat"], prompt: "One Birria Eclipse, please. Confirm with total." },
  { user: "customer-107", tags: ["feature:order-chat"], prompt: "Three Hongos Humildes, no queso. Confirm with total." },
  { user: "sign-bot", tags: ["feature:daily-special"], prompt: "One-line sidewalk sign for the Camarón Cañón. Friday hype." },
];

for (const r of requests) {
  await generateText({
    model: "openai/gpt-5.4-mini",
    prompt: `${r.prompt}\n\n${MENU}`,
    providerOptions: {
      gateway: { user: r.user, tags: r.tags },
    },
  });
  console.log(`tagged: ${r.user} ${r.tags.join(",")}`);
}

// Reporting data lands after a few minutes; run this part again if empty.
const today = new Date().toISOString().slice(0, 10);
const report = await gateway.getSpendReport({
  startDate: today,
  endDate: today,
  groupBy: "tag",
});

console.log("--- spend by feature (today) ---");
for (const row of report.results) {
  console.log(`${row.tag}: $${row.totalCost.toFixed(6)} (${row.requestCount} requests)`);
}
console.log("Compare the rows above; which feature costs more depends on today's traffic and output.");
