import { connectSlackCredentials } from "@vercel/connect/eve";
import { callSlackApi } from "eve/channels/slack";
import { defineTool } from "eve/tools";
import { z } from "zod";
import { getFounderChannel } from "@/lib/founder-channels";
import { claimPost, markPosted, releaseClaim } from "@/lib/slack-posts";
import { requireFounder } from "../lib/founder";

// The Slack bot token comes from Vercel Connect at call time. No Slack secret
// lives in this project's environment variables.
const slack = connectSlackCredentials(process.env.SLACK_BOT_CONNECTOR!);

const NO_CHANNEL = "No investor channel is set up for your account. Ask the operator to assign one.";

export default defineTool({
  description:
    "Post the finished investor update to the founder's own investor channel in Slack. Only call this after the founder asks you to send it.",
  inputSchema: z.object({
    month: z.string().regex(/^\d{4}-\d{2}$/),
    text: z.string().min(20).max(3000).describe("The full update, formatted for Slack."),
  }),
  approval: {
    // Approval answers "does the founder want this sent?", never "may this
    // founder write there?" That second question is checked here first: a
    // founder with no assigned channel is denied before any approval card.
    // Everyone else is asked every time, because once() would remember the
    // first yes whatever text the next call carries.
    request: async ({ session }) =>
      (await getFounderChannel(requireFounder({ session })))
        ? "user-approval"
        : { type: "denied", reason: NO_CHANNEL },
    prompt: ({ input }) =>
      `Post this ${input.month} update to your investor channel?\n\n${input.text}`,
  },
  async execute({ month, text }, ctx) {
    const founderId = requireFounder(ctx);

    // Look the destination up again at send time. It comes from the founder's
    // own row, so no founder can reach another founder's channel.
    const channel = await getFounderChannel(founderId);
    if (!channel) return { posted: false, month, reason: NO_CHANNEL };

    // Approval isn't exactly-once, and a resumed run can call this again.
    // Claim the month first so investors never get the same update twice.
    const claim = await claimPost(founderId, month);
    if (claim.kind === "already-posted") return { posted: true, month, ts: claim.ts, alreadyPosted: true };
    if (claim.kind === "in-doubt") {
      return { posted: false, month, reason: "An earlier attempt stopped mid-post. Check your investor channel before retrying." };
    }

    const response = await callSlackApi({
      botToken: slack.botToken,
      operation: "chat.postMessage",
      body: { channel, text },
    });
    if (!response.ok) {
      await releaseClaim(founderId, month);
      throw new Error(`Slack rejected the post: ${String(response.error)}`);
    }

    await markPosted(founderId, month, String(response.ts));
    return { posted: true, month, ts: response.ts };
  },
});
