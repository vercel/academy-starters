import { Pool } from "pg";

// The Marketplace Postgres integration adds DATABASE_URL to every environment
// you connect it to. One pool per Function instance; Fluid compute reuses it
// across concurrent requests.
export const db = new Pool({ connectionString: process.env.DATABASE_URL });
