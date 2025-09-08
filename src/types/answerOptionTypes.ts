import { AnswerOptionTable } from "../drizzle/schema/answerOption";

// #region DB types
export type AnswerOptionSelect = typeof AnswerOptionTable.$inferSelect;
export type AnswerOptionInsert = typeof AnswerOptionTable.$inferInsert;
export type AnswerOptionUpdate = Partial<Omit<AnswerOptionSelect, "id" | "questionId">>;
//#endregion

// #region Answer option public
export type AnswerOptionPublic = Omit<AnswerOptionSelect, "questionId" | "isCorrect">;
//#endregion

// #region Answer option private
export type AnswerOptionPrivate = Omit<AnswerOptionSelect, "questionId">;
//#endregion

// #region Completion answer option
export type CompletionAnswerOption = AnswerOptionPrivate & {
	selected: boolean;
};
// #endregion
