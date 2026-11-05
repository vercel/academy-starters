import { isStepCount, Output, streamText } from "ai";
import { draftSchema } from "@/lib/draft-schema";
import { servedBy } from "@/lib/served-by";
import { getMetricsTool } from "@/lib/tools/get-metrics";
import type { Highlights } from "@/lib/updates";

export const instructions = `You write monthly investor updates for early-stage founders.
Use only the notes and numbers you're given. Never invent a metric.
Lead with the most important number. Keep bad news in, stated plainly.
A burn multiple above 2 means the startup spends a lot for each new dollar of revenue. Never list it as a win.
Write like a founder who respects their investors' time.`;

// The variant behind the draft-style flag in 5.3.
const styles = {
  classic: "",
  short: "Keep the entire update under 120 words. One win, one lowlight, one ask.",
} as const;

export type DraftStyle = keyof typeof styles;

type DraftInput = {
  style?: DraftStyle;
  founderId: string;
  founderName: string;
  updateId: string;
  requestId?: string;
  month: string;
  notes: string;
  highlights: Highlights | null;
  tags?: string[];
};

// The one place a draft gets generated. The route streams it to the browser;
// the eval in evals/draft.eval.mts awaits it and scores it.
export function streamDraft(input: DraftInput) {
  return streamText({
    // DRAFT_MODEL lets you swap the primary per environment without a code change.
    model: process.env.DRAFT_MODEL ?? "openai/gpt-5.4-mini",
    instructions: [instructions, styles[input.style ?? "classic"]].filter(Boolean).join("\n"),
    prompt: [
      `Founder: ${input.founderName}`,
      `Month: ${input.month}`,
      `Notes: ${input.notes}`,
      `Highlights: ${JSON.stringify(input.highlights)}`,
    ].join("\n"),
    tools: { getMetrics: getMetricsTool },
    toolsContext: { getMetrics: { founderId: input.founderId } },
    // One step to call the tool, one to write the draft, one spare.
    stopWhen: isStepCount(3),
    output: Output.object({ schema: draftSchema }),
    providerOptions: {
      gateway: {
        // Tried in order when the primary model fails or is unavailable.
        models: ["anthropic/claude-haiku-5.5"],
        // Attribute spend to a founder and a feature. Never put an email or
        // a name here; an opaque ID is enough.
        user: input.founderId,
        tags: input.tags ?? [
          "feature:draft",
          `env:${process.env.VERCEL_ENV ?? "development"}`,
          `style:${input.style ?? "classic"}`,
        ],
      },
    },
    // The response has already started streaming when these fire, so the log
    // line is the only record. requestId ties it to the founder's request.
    onError({ error }) {
      console.error(
        JSON.stringify({
          event: "draft.stream_failed",
          requestId: input.requestId,
          updateId: input.updateId,
          error: String(error),
        }),
      );
    },
    onEnd({ providerMetadata, usage }) {
      console.log(
        JSON.stringify({
          event: "draft.done",
          requestId: input.requestId,
          updateId: input.updateId,
          style: input.style ?? "classic",
          servedBy: servedBy(providerMetadata),
          inputTokens: usage.inputTokens,
          outputTokens: usage.outputTokens,
        }),
      );
    },
  });
}
