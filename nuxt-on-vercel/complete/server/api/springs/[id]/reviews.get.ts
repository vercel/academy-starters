import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const DATA_DIR = join(process.cwd(), ".data", "users");

export default defineEventHandler(async (event) => {
  const springId = getRouterParam(event, "id");

  if (!springId) {
    throw createError({ statusCode: 400, statusMessage: "Missing spring ID" });
  }

  if (!existsSync(DATA_DIR)) {
    return [];
  }

  const files = await readdir(DATA_DIR);
  const allReviews: {
    id: string;
    springId: string;
    body: string;
    author: string;
    createdAt: string;
  }[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const raw = await readFile(join(DATA_DIR, file), "utf-8");
    const userData = JSON.parse(raw);

    const springReviews = (userData.reviews || [])
      .filter((r: { springId: string }) => r.springId === springId)
      .map((r: { id: string; body: string; createdAt: string }) => ({
        ...r,
        author: userData.login || `User ${file.replace(".json", "")}`,
      }));

    allReviews.push(...springReviews);
  }

  return allReviews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
});
