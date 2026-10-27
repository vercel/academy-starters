import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// TODO: Implement updateSession for proxy
// This function should:
// 1. Create a supabaseResponse with NextResponse.next({ request })
// 2. Create a Supabase server client with cookie handlers that:
//    - getAll(): return request.cookies.getAll()
//    - setAll(): update both request cookies and response cookies
// 3. Call supabase.auth.getUser() to refresh the session
// 4. Redirect unauthenticated users from /protected/* to /sign-in
// 5. Redirect authenticated users from / to /protected
// 6. Return the supabaseResponse (with updated cookies)

export async function updateSession(request: NextRequest) {
  // Skip if Supabase isn't configured yet (allows starter to run)
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.next({ request });
  }

  // TODO: Implement session refresh and route protection
  // For now, just pass through without auth checking
  // Once implemented, this will:
  // - Refresh auth cookies on each request
  // - Redirect /protected/* to /sign-in if not authenticated
  // - Redirect / to /protected if authenticated

  return NextResponse.next({ request });
}
