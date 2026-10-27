export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const springId = getRouterParam(event, "id");
  const body = await readBody<{ body: string }>(event);

  if (!springId) {
    throw createError({ statusCode: 400, statusMessage: "Missing spring ID" });
  }

  if (!body?.body?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Review body is required",
    });
  }

  const data = await getUserData(session.user.id);

  // Store the user's login for display
  (data as any).login = session.user.login;

  data.reviews.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    springId,
    body: body.body.trim(),
    createdAt: new Date().toISOString(),
  });

  await setUserData(session.user.id, data);

  return { success: true };
});
