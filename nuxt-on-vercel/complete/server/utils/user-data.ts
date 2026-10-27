import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const DATA_DIR = join(process.cwd(), ".data", "users");

async function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

function userFilePath(userId: number): string {
  return join(DATA_DIR, `${userId}.json`);
}

interface UserData {
  favorites: { springId: string; addedAt: string }[];
  visited: { springId: string; visitedAt: string }[];
  reviews: { id: string; springId: string; body: string; createdAt: string }[];
}

export async function getUserData(userId: number): Promise<UserData> {
  await ensureDir();
  const filePath = userFilePath(userId);

  if (!existsSync(filePath)) {
    return { favorites: [], visited: [], reviews: [] };
  }

  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function setUserData(
  userId: number,
  data: UserData
): Promise<void> {
  await ensureDir();
  await writeFile(userFilePath(userId), JSON.stringify(data, null, 2));
}
