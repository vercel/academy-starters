import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// The agent in agent/ runs as its own service on the same domain. Pages go to
// Next.js; requests to /eve/v1/* go to the agent. `next dev` starts both.
export default withEve(nextConfig);
