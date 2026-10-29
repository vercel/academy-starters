import { tool } from "ai";
import { z } from "zod";
import { app } from "~/app";
import { getChannelContextAsModelMessage } from "~/lib/slack/utils";
import { slackContextSchema } from "../context";

export const getChannelMessagesTool = tool({
  description:
    "Get the messages from a Slack channel. This will help you understand the context of the channel conversation.",
  inputSchema: z.object({}),
  contextSchema: slackContextSchema,
  execute: async (_, { context }) => {
    try {
      const { channel, botId } = context;
      if (!channel) return [];

      return await getChannelContextAsModelMessage({
        channel,
        botId,
      });
    } catch (error) {
      app.logger.error("Failed to get channel messages:", error);
      return [];
    }
  },
});
