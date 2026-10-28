// Salt level lookup. The database stores 0|1|2|3 as an integer with a CHECK
// constraint. Anything user-facing should go through SALT_LEVEL_NAMES or
// formatSaltLevel, never hardcode "2" or "classic" anywhere else.
export const SALT_LEVEL_NAMES = [
  "none",
  "light",
  "classic",
  "pretzel-shop-grandma",
] as const;

export type SaltLevel = 0 | 1 | 2 | 3;
export type SaltLevelName = (typeof SALT_LEVEL_NAMES)[number];

export function formatSaltLevel(level: number): SaltLevelName {
  if (level < 0 || level > 3 || !Number.isInteger(level)) {
    throw new Error(`Invalid salt level: ${level}. Must be 0, 1, 2, or 3.`);
  }
  return SALT_LEVEL_NAMES[level as SaltLevel];
}
