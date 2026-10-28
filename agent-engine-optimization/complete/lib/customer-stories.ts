import customerStoriesData from "@/data/customer-stories.json";

export type CustomerEvidence = {
  customer: string;
  role: string;
  useCase: string;
  quote: string;
  outcome: string;
  date: string;
  sourceUrl: string;
  approved: boolean;
};

const evidence = customerStoriesData as Record<string, CustomerEvidence[]>;

export function getEvidenceForCapability(slug: string): CustomerEvidence[] {
  return (evidence[slug] ?? []).filter((entry) => entry.approved);
}
