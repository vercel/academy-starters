export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const springId = getRouterParam(event, "springId");

  if (!springId) {
    throw createError({ statusCode: 400, statusMessage: "Missing spring ID" });
  }

  const data = await getUserData(session.user.id);
  data.visited = data.visited.filter((v) => v.springId !== springId);
  await setUserData(session.user.id, data);

  return { success: true };
});
