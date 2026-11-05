import { getFounder } from "@/lib/session";
import { getUpdate } from "@/lib/updates";

export async function GET(request: Request, ctx: RouteContext<"/api/updates/[id]">) {
  const founder = await getFounder(request.headers);
  if (!founder) return Response.json({ error: "Sign in first" }, { status: 401 });

  const { id } = await ctx.params;
  const update = await getUpdate(founder.id, id);
  // Another founder's update gets the same 404 as one that doesn't exist,
  // so the response doesn't confirm that the ID is real.
  if (!update) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(update);
}
