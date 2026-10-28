import type { MetadataRoute } from "next";
import { capabilities } from "@/lib/capabilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://signalarc.example.com";
  const staticRoutes = [
    "",
    "/platform",
    "/solutions/nextjs-observability",
    "/guides",
    "/guides/reduce-alert-noise",
    "/guides/choose-observability-signals",
    "/guides/best-observability-tools-for-startups",
    "/troubleshooting",
    "/troubleshooting/missing-source-maps",
    "/faq",
    "/pricing",
    "/security",
    "/support",
    "/about",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date("2026-08-05"),
    })),
    ...capabilities.map((capability) => ({
      url: `${baseUrl}/platform/${capability.slug}`,
      lastModified: new Date("2026-08-05"),
    })),
  ];
}
