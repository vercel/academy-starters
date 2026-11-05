import { createAuthClient } from "better-auth/react";

// Better Auth 1.7 registers the Connect provider as a regular social
// provider, so the client needs no extra plugin.
export const authClient = createAuthClient();
