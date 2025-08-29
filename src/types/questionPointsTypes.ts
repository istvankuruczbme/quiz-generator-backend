import { QuestionPointsTable } from "../drizzle/schema/questionPoints";

// #region DB types
export type QuestionPointsSelect = typeof QuestionPointsTable.$inferSelect;
export type QuestionPointsInsert = typeof QuestionPointsTable.$inferInsert;
export type QuestionPointsUpdate = Partial<Omit<QuestionPointsSelect, "id" | "questionId">>;
//#endregion

// #region Question points
export type QuestionPoints = Omit<QuestionPointsSelect, "id" | "questionId">;
//#endregion
