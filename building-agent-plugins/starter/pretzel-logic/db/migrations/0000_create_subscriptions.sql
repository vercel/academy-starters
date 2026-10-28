CREATE TABLE "subscriptions" (
  "id" SERIAL PRIMARY KEY,
  "slug" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "size_oz" INTEGER NOT NULL,
  "price_cents" INTEGER NOT NULL,
  "salt_level" INTEGER NOT NULL CHECK ("salt_level" IN (0, 1, 2, 3)),
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL
);
