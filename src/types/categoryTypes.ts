import { CategoryTable } from "../drizzle/schema/category";

// #region DB types
export type CategorySelect = typeof CategoryTable.$inferSelect;
//#endregion
