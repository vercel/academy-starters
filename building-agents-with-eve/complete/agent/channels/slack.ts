import { connectSlackCredentials } from "@vercel/connect/eve";
import { defaultSlackAuth, slackChannel } from "eve/channels/slack";

// The same dispatcher, now answering in Slack. No tool, skill, or state code
// changes to get here: a channel only normalizes input, owns the conversation's
// resume handle, and decides delivery. Everything the agent *does* is unchanged.
//
// Credentials run through Vercel Connect, so there's no SLACK_BOT_TOKEN or
// signing secret in your code. `eve add channel/slack` creates or reuses the
// Connect connector and routes its events to /eve/v1/slack. Set SLACK_CONNECTOR
// to that connector's UID if it isn't slack/spoke-and-mirror.
export default slackChannel({
  credentials: connectSlackCredentials(
    process.env.SLACK_CONNECTOR ?? "slack/spoke-and-mirror",
  ),

  // Answer @mentions from people; ignore other bots. defaultSlackAuth stamps
  // Slack identity, but does not invent a shop membership tier.
  onAppMention: (ctx, message) =>
    message.author?.isBot ? null : { auth: defaultSlackAuth(message, ctx) },

  // No delivery code needed: eve's default renderer posts the final reply to
  // the thread and shows tool-call narration as the thread status instead.
});
