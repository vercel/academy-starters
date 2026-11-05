// Reports which deployment answered. Every deployment is immutable, so this
// response is prerendered once per deployment at build time.
export function GET() {
  return Response.json({
    status: "ok",
    environment: process.env.VERCEL_ENV ?? "development",
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
  });
}
