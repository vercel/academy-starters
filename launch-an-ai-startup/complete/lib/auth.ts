import { Pool } from "pg";
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import { connect, ConnectError } from "@vercel/connect/betterauth";

// ALLOWED_FOUNDER_EMAILS is a comma-separated list of invited founders.
export function isInvited(email: string | null | undefined): boolean {
  const invited = (process.env.ALLOWED_FOUNDER_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email) && invited.includes(email!.toLowerCase());
}

// Founders sign in with Slack through a Vercel Connect connector. Better Auth
// stores users and sessions in the same Postgres database as the app.
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  // Production and Development set BETTER_AUTH_URL. Every Preview has its own
  // URL, so Previews fall back to the branch URL Vercel sets on each one.
  baseURL:
    process.env.BETTER_AUTH_URL ??
    (process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : undefined),
  database: new Pool({ connectionString: process.env.DATABASE_URL! }),
  // Anyone with a Slack account can complete Slack sign-in, so a session only
  // proves who someone is. Only invited founders get an account at all.
  // Unset means nobody: the list fails closed.
  databaseHooks: {
    user: {
      create: {
        before: async (user) => isInvited(user.email),
      },
    },
  },
  plugins: [
    genericOAuth({
      config: [
        connect({
          // Not "slack": that ID belongs to Better Auth's built-in Slack
          // provider, and reusing it logs a shadowing warning.
          providerId: "slack-connect",
          connector: process.env.CONNECTOR_SLACK!,
        }),
      ],
    }),
  ],
  onAPIError: {
    errorURL: "/sign-in",
    onError(error) {
      if (error instanceof ConnectError) {
        console.error("Vercel Connect sign-in failed", {
          code: error.code,
          status: error.status,
          statusText: error.statusText,
        });
        return;
      }
      console.error("Better Auth request failed", error);
    },
  },
});
