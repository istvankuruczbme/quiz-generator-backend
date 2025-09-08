import { QuizTable } from "../drizzle/schema/quiz";
import { CategorySelect } from "./categoryTypes";
import { CompletionQuestionPrivate, CompletionQuestionPublic } from "./completionQuestionTypes";
import { QuestionPrivate, QuestionPublic } from "./questionTypes";
import { QuizConfig } from "./quizConfigTypes";
import { UserPublic } from "./userTypes";

//#region DB types
export type QuizSelect = typeof QuizTable.$inferSelect;
export type QuizInsert = typeof QuizTable.$inferInsert;
export type QuizUpdate = Partial<Omit<QuizSelect, "id" | "userId" | "createdAt">>;
// #endregion

// #region Quiz data
type QuizData = Omit<QuizSelect, "categoryId" | "userId" | "deletedAt"> & {
	config: QuizConfig;
	category: CategorySelect;
	user: UserPublic;
};
//#endregion

// #region Quiz summary
export type QuizSummary = QuizData & {
	questionCount: number;
	completionCount: number;
};
// #endregion

// #region Quiz (public)
export type QuizPublic = QuizData & {
	questions: QuestionPublic[];
	completionCount: number;
};
//#endregion

// #region Quiz (private)
export type QuizPrivate = QuizData & {
	questions: QuestionPrivate[];
	completionCount: number;
};
//#endregion

//#region Completion question (public)
export type CompletionQuizPublic = QuizData & {
	questions: CompletionQuestionPublic[];
};
//#endregion

//#region Completion question (private)
export type CompletionQuizPrivate = QuizData & {
	questions: CompletionQuestionPrivate[];
};
//#endregion
