import type { Drop } from "@/app/lib/types";

export const drops: Drop[] = [
  {
    id: "drop-001",
    productSlug: "foundry",
    releaseDate: "2026-03-15T10:00:00Z",
    status: "live",
  },
  {
    id: "drop-002",
    productSlug: "crosswalk",
    releaseDate: "2026-04-12T10:00:00Z",
    status: "live",
  },
  {
    id: "drop-003",
    productSlug: "off-hours",
    releaseDate: "2026-06-07T10:00:00Z",
    status: "upcoming",
  },
  {
    id: "drop-004",
    productSlug: "backroad",
    releaseDate: "2026-07-19T10:00:00Z",
    status: "upcoming",
  },
  {
    id: "drop-005",
    productSlug: "field-day",
    releaseDate: "2026-08-23T10:00:00Z",
    status: "announced",
  },
];

export function getNextDrop(): Drop | undefined {
  const now = new Date();
  return drops
    .filter((d) => new Date(d.releaseDate) > now && d.status !== "live")
    .sort(
      (a, b) =>
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    )[0];
}
