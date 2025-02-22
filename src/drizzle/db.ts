import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as user from "./schema/user";

const client = postgres(process.env.SUPABASE_DATABASE_URL!, { prepare: false });

// Schema
const schema = {
	...user,
};

export const db = drizzle(client, { schema });
