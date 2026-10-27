"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

// beforeSend is a function, so it has to live in a Client Component.
// The root layout is a Server Component and can't pass one down.
export function Analytics() {
  return (
    <VercelAnalytics
      beforeSend={(event) => {
        if (event.url.includes("/admin")) return null;
        return event;
      }}
    />
  );
}
