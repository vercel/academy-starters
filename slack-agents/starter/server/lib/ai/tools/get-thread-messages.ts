import { tool } from "ai";
import { z } from "zod";
import { app } from "~/app";
import { getThreadContextAsModelMessage } from "~/lib/slack/utils";
import { slackContextSchema } from "../context";

export const getThreadMessagesTool = tool({
  description:
    "Get the messages from a Slack thread. This will help you understand the context of the thread conversation.",
  inputSchema: z.object({}),
  contextSchema: slackContextSchema,
  execute: async (_, { context }) => {
    try {
      const { channel, thread_ts, botId } = context;
      if (!channel || !thread_ts) return [];

      return await getThreadContextAsModelMessage({
        channel,
        ts: thread_ts,
        botId,
      });
    } catch (error) {
      app.logger.error("Failed to get thread messages:", error);
      return [];
    }
  },
});
