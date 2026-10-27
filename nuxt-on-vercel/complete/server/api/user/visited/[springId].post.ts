export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const springId = getRouterParam(event, "springId");

  if (!springId) {
    throw createError({ statusCode: 400, statusMessage: "Missing spring ID" });
  }

  const data = await getUserData(session.user.id);

  if (!data.visited.some((v) => v.springId === springId)) {
    data.visited.push({ springId, visitedAt: new Date().toISOString() });
    await setUserData(session.user.id, data);
  }

  return { success: true };
});
