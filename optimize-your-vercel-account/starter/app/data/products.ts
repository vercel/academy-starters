import type { Product } from "@/app/lib/types";

export const products: Product[] = [
  {
    id: "sat-foundry-onyx",
    slug: "foundry",
    name: "Foundry",
    colorway: "Onyx",
    price: 210,
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13],
    heroImage: "/products/foundry.jpg",
    description:
      "A high-top in oiled leather. Built to look better at month six than it did out of the box.",
    releaseStatus: "live",
  },
  {
    id: "sat-crosswalk-cement",
    slug: "crosswalk",
    name: "Crosswalk",
    colorway: "Cement",
    price: 165,
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13],
    heroImage: "/products/crosswalk.jpg",
    description:
      "The everyday low-top. Mesh upper, EVA midsole, a tread pattern that survives morning commutes and afternoon meetings.",
    releaseStatus: "live",
  },
  {
    id: "sat-offhours-twilight",
    slug: "off-hours",
    name: "Off-Hours",
    colorway: "Twilight",
    price: 175,
    sizes: [7, 8, 9, 10, 11, 12, 13],
    heroImage: "/products/off-hours.jpg",
    description:
      "A slip-on in brushed navy suede. For the part of the day that isn't a meeting.",
    releaseStatus: "upcoming",
  },
  {
    id: "sat-backroad-field",
    slug: "backroad",
    name: "Backroad",
    colorway: "Field",
    price: 195,
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    heroImage: "/products/backroad.jpg",
    description:
      "Olive and tan, rugged outsole, water-resistant upper. The kind of shoe you can wear into a forest without filing a complaint.",
    releaseStatus: "upcoming",
  },
  {
    id: "sat-fieldday-bone",
    slug: "field-day",
    name: "Field Day",
    colorway: "Bone",
    price: 145,
    sizes: [7, 8, 9, 10, 11, 12],
    heroImage: "/products/field-day.jpg",
    description:
      "A clean, low-top everyday shoe in bone-white canvas. The one you'll buy two pairs of.",
    releaseStatus: "announced",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
