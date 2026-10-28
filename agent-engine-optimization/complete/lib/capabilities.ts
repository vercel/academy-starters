import capabilitiesData from "@/data/capabilities.json";

export type Capability = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  bestFor: string;
  availability: string;
  pricingNote: string;
  retention: string;
  setup: string;
  supportedFrameworks: string[];
  features: string[];
  limitations: string[];
  docsUrl: string;
};

export const capabilities = capabilitiesData as Capability[];

export function getCapabilityBySlug(slug: string): Capability | undefined {
  return capabilities.find((capability) => capability.slug === slug);
}

export function getCapabilitiesByCategory(category: string): Capability[] {
  return capabilities.filter((capability) => capability.category === category);
}
