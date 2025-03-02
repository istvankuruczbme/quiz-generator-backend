import { UserTable } from "../drizzle/schema/user";

export type User = typeof UserTable.$inferSelect;
