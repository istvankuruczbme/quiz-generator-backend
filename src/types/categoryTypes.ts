import { CategoryTable } from "../drizzle/schema/category";

export type Category = typeof CategoryTable.$inferSelect;
