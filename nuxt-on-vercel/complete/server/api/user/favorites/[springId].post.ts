export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const springId = getRouterParam(event, "springId");

  if (!springId) {
    throw createError({ statusCode: 400, statusMessage: "Missing spring ID" });
  }

  const data = await getUserData(session.user.id);

  if (!data.favorites.some((f) => f.springId === springId)) {
    data.favorites.push({ springId, addedAt: new Date().toISOString() });
    await setUserData(session.user.id, data);
  }

  return { success: true };
});
