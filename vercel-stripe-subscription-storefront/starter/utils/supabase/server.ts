import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// TODO: Implement createSupabaseClient for server usage
// This function should:
// 1. Get the cookie store with: const cookieStore = await cookies()
// 2. Call createServerClient from @supabase/ssr with:
//    - NEXT_PUBLIC_SUPABASE_URL
//    - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
//    - A cookies config object with getAll() and setAll() methods
// 3. getAll() should return cookieStore.getAll()
// 4. setAll() should iterate cookiesToSet and call cookieStore.set()
//    - Wrap in try/catch (Server Components can't set cookies)
// 5. Return the client

// Mock client that allows the app to build before Supabase is configured
const mockSupabaseClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
    signUp: async () => ({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
      }),
      order: () => ({
        data: [],
        error: null,
      }),
    }),
    insert: async () => ({ data: null, error: { message: "Supabase not configured" } }),
    update: async () => ({ data: null, error: { message: "Supabase not configured" } }),
    delete: async () => ({ data: null, error: { message: "Supabase not configured" } }),
  }),
} as unknown as ReturnType<typeof createServerClient>;

export async function createSupabaseClient() {
  // Return mock if Supabase is not configured (allows build to succeed)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return mockSupabaseClient;
  }

  // TODO: Replace this with your implementation
  // Once you implement this function, remove the mock return above
  return mockSupabaseClient;
}
