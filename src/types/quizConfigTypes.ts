import { QuizConfigTable } from "../drizzle/schema/quizConfig";

// #region DB types
export type QuizConfigSelect = typeof QuizConfigTable.$inferSelect;
export type QuizConfigInsert = typeof QuizConfigTable.$inferInsert;
export type QuizConfigUpdate = Partial<
	Pick<QuizConfigSelect, "state" | "visibility" | "questionOrder">
>;
//#endregion

//#region Quiz config
export type QuizConfig = Omit<QuizConfigSelect, "id" | "quizId">;
//#endregion
