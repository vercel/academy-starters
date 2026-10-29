import { NextResponse } from "next/server";
import {
  cacheTag,
  cacheLife,
} from "next/cache";
import { getProductById } from "@/app/data/products";
import type {
  StockCheckRequest,
  StockCheckResponse,
} from "@/app/lib/types";

async function fetchStockFromWarehouse(
  sku: string,
  size: number
): Promise<StockCheckResponse> {
  "use cache: remote";
  cacheTag(`stock-${sku}`);
  cacheLife({ revalidate: 60, expire: 300 });

  // Simulates a slow upstream inventory lookup.
  // The 'use cache: remote' directive above stores the result in Runtime Cache
  // so repeat requests in the same region skip this call.
  await new Promise((resolve) => setTimeout(resolve, 800));

  const product = getProductById(sku);
  if (!product || !product.sizes.includes(size)) {
    return { available: false, count: 0 };
  }

  const deterministicCount = ((sku.length * size * 7) % 12) + 1;
  return { available: true, count: deterministicCount };
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<StockCheckRequest>;

  if (!body.sku || typeof body.size !== "number") {
    return NextResponse.json(
      { error: "sku and size are required" },
      { status: 400 }
    );
  }

  const result = await fetchStockFromWarehouse(body.sku, body.size);
  return NextResponse.json(result);
}
