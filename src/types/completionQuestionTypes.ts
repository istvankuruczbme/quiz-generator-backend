import { CompletionQuestionTable } from "../drizzle/schema/completionQuestion";
import { QuestionPrivate, QuestionPublic } from "./questionTypes";

// #region DB types
export type CompletionQuestionSelect = typeof CompletionQuestionTable.$inferSelect;
export type CompletionQuestionInsert = typeof CompletionQuestionTable.$inferInsert;
// #endregion

// #region Completion question with question ID
export type CompletionQuestionWithQuestionId = Omit<CompletionQuestionSelect, "completionId">;
//#endregion

// #region Completion question public
export type CompletionQuestionPublic = QuestionPublic & {
	completion?: {
		selectedAnswerOptionIds: string[];
		answeredAt: Date;
	};
};
// #endregion

// #region Completion question private
export type CompletionQuestionPrivate = QuestionPrivate & {
	completion: {
		selectedAnswerOptionIds: string[];
		answeredAt: Date;
	};
};
// #endregion
