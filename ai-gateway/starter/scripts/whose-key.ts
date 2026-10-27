import { generateText } from "ai";

const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  prompt: "One sentence: talk a nervous first-timer into the Birria Eclipse.",
});

const routing = result.finalStep.providerMetadata?.gateway?.routing as any;
const attempts = routing?.modelAttempts?.flatMap(
  (m: any) => m.providerAttempts ?? []
) ?? [];

attempts.forEach((a: any, i: number) => {
  const outcome = a.success ? "success" : `failed: ${a.error}`;
  console.log(`Attempt ${i + 1}: ${a.provider} (${a.credentialType}) — ${outcome}`);
});

const winner = attempts.find((a: any) => a.success);
const whose = winner?.credentialType === "byok" ? "YOUR key" : "system credentials";
console.log(`Served by: ${winner?.provider} using ${whose}`);
