import { vercelAdapter } from "@flags-sdk/vercel";
import { dedupe, flag } from "flags/next";
import { getFounder } from "@/lib/session";

type Entities = { founder?: { id: string } };

// Who's asking, so dashboard targeting can roll a flag out to some founders
// first. dedupe() reads the session once per request, however many flags ask.
const identify = dedupe(async ({ headers }: { headers: Headers }): Promise<Entities> => {
  const founder = await getFounder(headers);
  return { founder: founder ? { id: founder.id } : undefined };
});

export const draftStyle = flag<"classic" | "short", Entities>({
  key: "draft-style",
  description: "How the AI writes investor updates. 'short' is the new style under test.",
  adapter: vercelAdapter(),
  identify,
  defaultValue: "classic",
  options: [
    { value: "classic", label: "Classic" },
    { value: "short", label: "Short" },
  ],
});
