import { z } from "zod";

// The Slack details every tool needs. Each tool declares this as its
// contextSchema, and respond-to-message.ts passes the values in toolsContext.
export const slackContextSchema = z.object({
  channel: z.string().optional(),
  thread_ts: z.string().optional(),
  botId: z.string().optional(),
});

export type SlackContext = z.infer<typeof slackContextSchema>;
