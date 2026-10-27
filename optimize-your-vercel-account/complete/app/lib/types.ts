export type Product = {
  id: string;
  slug: string;
  name: string;
  colorway: string;
  price: number;
  sizes: number[];
  heroImage: string;
  description: string;
  releaseStatus: "live" | "upcoming" | "announced";
};

export type Drop = {
  id: string;
  productSlug: string;
  releaseDate: string;
  status: "announced" | "upcoming" | "live" | "sold-out";
};

export type StockCheckRequest = {
  sku: string;
  size: number;
};

export type StockCheckResponse = {
  available: boolean;
  count: number;
};
