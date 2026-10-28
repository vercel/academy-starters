/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable "use cache" directive (stable in Next.js 16)
  cacheComponents: true,

  // Custom cache life profiles for "use cache" directive
  cacheLife: {
    // Default profiles: "seconds", "minutes", "hours", "days", "weeks", "max"
    // Custom profile for AI summaries - cache for 1 hour, revalidate after 30 min
    aiSummary: {
      stale: 1800, // 30 minutes - serve stale while revalidating
      revalidate: 3600, // 1 hour - background revalidation interval
      expire: 86400, // 24 hours - maximum cache lifetime
    },
  },
};

export default nextConfig;
