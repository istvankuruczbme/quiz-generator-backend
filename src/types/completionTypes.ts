import { CompletionTable } from "../drizzle/schema/completion";
import { CompletionQuestionWithQuestionId } from "./completionQuestionTypes";
import { CompletionQuizPrivate, CompletionQuizPublic } from "./quizTypes";
import { UserPublic } from "./userTypes";

// #region DB types
export type CompletionSelect = typeof CompletionTable.$inferSelect;
export type CompletionInsert = typeof CompletionTable.$inferInsert;
export type CompletionUpdate = Partial<Pick<CompletionSelect, "updatedAt" | "finishedAt">>;
//#endregion

// #region Completion with questions
export type CompletionWithQuestions = Omit<CompletionSelect, "userId" | "quizId"> & {
	questions: CompletionQuestionWithQuestionId[];
};
//#endregion

// #region Completion (public)
export type CompletionPublic = Omit<CompletionSelect, "userId" | "quizId"> & {
	user: UserPublic;
	quiz: CompletionQuizPublic;
};
// #endregion

// #region Completion (private)
export type CompletionPrivate = Omit<CompletionSelect, "userId" | "quizId"> & {
	user: UserPublic;
	quiz: CompletionQuizPrivate;
};
// #endregion
