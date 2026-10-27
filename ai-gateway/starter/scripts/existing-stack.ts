import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: "https://ai-gateway.vercel.sh/v1",
});

const order =
  "Take this order and confirm it back with a total: two Al Pastor Meteors " +
  "($4.50 each) and one agua fresca ($3.00).";

for (const model of ["openai/gpt-5.4-mini", "anthropic/claude-sonnet-4.6"]) {
  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: order }],
  });

  console.log(`[${model} via OpenAI SDK]`);
  console.log(completion.choices[0].message.content?.trim());
  console.log();
}
