import { NextResponse, type NextRequest } from "next/server";
import { detectAgent } from "@/lib/bot-detection";

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const agent = detectAgent(userAgent);

  if (agent) {
    console.log(
      `[ai-crawler] ${agent} requested ${request.nextUrl.pathname} at ${new Date().toISOString()}`
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|llms.txt).*)"],
};
