type CallerContext = {
  session: { auth: { current?: { principalId: string; principalType: string } | null } };
};

// The founder comes from verified route auth (agent/channels/eve.ts), never
// from the prompt or a tool argument.
export function requireFounder(ctx: CallerContext): string {
  const caller = ctx.session.auth.current;
  if (caller?.principalType !== "user") {
    throw new Error("Sign in through Up and to the Right to use this agent.");
  }
  return caller.principalId;
}
