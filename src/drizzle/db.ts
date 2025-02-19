import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.SUPABASE_DATABASE_URL!, { prepare: false });

// Schema

export const db = drizzle(client);
