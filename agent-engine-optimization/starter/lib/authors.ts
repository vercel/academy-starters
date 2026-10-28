export type Author = {
  slug: string;
  name: string;
  jobTitle: string;
  bio: string;
  credentials: string[];
  reviewAreas: string[];
  email: string;
};

export const authors: Author[] = [
  {
    slug: "mina-patel",
    name: "Mina Patel",
    jobTitle: "Staff Reliability Engineer",
    bio: "Mina owns SignalArc's technical guides and reviews examples involving telemetry, incident response, and production debugging.",
    credentials: [
      "Twelve years operating web applications and distributed systems",
      "Maintainer of SignalArc's incident-response runbooks"
    ],
    reviewAreas: ["Observability", "Incident response", "Troubleshooting"],
    email: "mina@signalarc.example.com"
  },
  {
    slug: "jon-bell",
    name: "Jon Bell",
    jobTitle: "Product Documentation Lead",
    bio: "Jon maintains SignalArc's product documentation, release notes, and editorial review process.",
    credentials: [
      "Eight years writing and maintaining developer documentation",
      "Owner of SignalArc's public documentation change log"
    ],
    reviewAreas: ["Product behavior", "Documentation", "Release accuracy"],
    email: "jon@signalarc.example.com"
  }
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}
