// Vercel stamps every request with x-vercel-id, and the same ID shows up in
// the request's log entry. Put it in error messages and log lines so a
// founder's screenshot leads straight to the failing request.
export function requestId(request: Request): string {
  return request.headers.get("x-vercel-id") ?? `local-${crypto.randomUUID().slice(0, 8)}`;
}
