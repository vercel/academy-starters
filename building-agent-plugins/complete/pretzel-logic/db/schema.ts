import { sql } from "drizzle-orm";
import {
  check,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const boxPlans = pgTable(
  "box_plans",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    sizeOz: integer("size_oz").notNull(),
    priceCents: integer("price_cents").notNull(),
    saltLevel: integer("salt_level").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    check("salt_level_range", sql`${table.saltLevel} IN (0, 1, 2, 3)`),
  ],
);

export type BoxPlan = typeof boxPlans.$inferSelect;
export type NewBoxPlan = typeof boxPlans.$inferInsert;
