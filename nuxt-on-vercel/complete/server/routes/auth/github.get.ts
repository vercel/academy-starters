export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        login: user.login,
        avatar_url: user.avatar_url,
        id: user.id,
      },
    });
    return sendRedirect(event, "/springs");
  },
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/login?error=auth");
  },
});
