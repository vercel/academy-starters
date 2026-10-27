export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    return [];
  }

  const data = await getUserData(session.user.id);
  return data.favorites;
});
