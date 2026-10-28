export const KNOWN_AGENT_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
] as const;

export type AgentUserAgent = (typeof KNOWN_AGENT_USER_AGENTS)[number];

export function detectAgent(userAgent: string | null): AgentUserAgent | null {
  if (!userAgent) return null;
  for (const agent of KNOWN_AGENT_USER_AGENTS) {
    if (userAgent.includes(agent)) {
      return agent;
    }
  }
  return null;
}

export function isAgent(userAgent: string | null): boolean {
  return detectAgent(userAgent) !== null;
}
