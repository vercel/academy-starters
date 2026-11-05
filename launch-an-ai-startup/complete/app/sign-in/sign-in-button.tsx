"use client";

import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  async function signIn() {
    const { error } = await authClient.signIn.social({
      provider: "slack-connect",
      callbackURL: "/",
      errorCallbackURL: "/sign-in",
    });
    if (error) console.error("Could not start sign-in", error);
  }

  return (
    <button onClick={signIn} className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">
      Sign in with Slack
    </button>
  );
}
