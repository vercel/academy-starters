import { NextResponse } from "next/server";
import { getProductById } from "@/app/data/products";
import type {
  StockCheckRequest,
  StockCheckResponse,
} from "@/app/lib/types";

async function fetchStockFromWarehouse(
  sku: string,
  size: number
): Promise<StockCheckResponse> {
  // Simulates a slow upstream inventory lookup.
  // Lesson 3.2 wraps this with Runtime Cache to cut repeat invocations.
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
