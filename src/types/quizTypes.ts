import { QuizTable } from "../drizzle/schema/quiz";
import { QuizConfigTable } from "../drizzle/schema/quizConfig";
import { Category } from "./categoryTypes";
import { QuestionPrivate, QuestionPublic } from "./questionTypes";
import { UserPublic } from "./userTypes";

// DB select
export type QuizConfig = typeof QuizConfigTable.$inferSelect;
export type Quiz = typeof QuizTable.$inferSelect;

// DB insert
export type QuizConfigUpdatableProperties = Partial<
	Pick<QuizConfig, "state" | "visibility" | "questionOrder">
>;
export type QuizUpdatableProperties = Partial<
	Pick<
		Quiz,
		"title" | "description" | "photoUrl" | "embedding" | "categoryId" | "updatedAt" | "deletedAt"
	>
>;

export type QuizConfigData = Pick<QuizConfig, "state" | "visibility" | "questionOrder">;
export type QuizData = Pick<
	Quiz,
	"id" | "title" | "description" | "photoUrl" | "updatedAt" | "createdAt"
> & {
	config: QuizConfigData;
	category: Category;
	user: UserPublic;
};

export type QuizSummary = QuizData & {
	questionCount: number;
	completionCount: number;
};

export type QuizFullPublic = QuizData & {
	questions: QuestionPublic[];
	completionCount: number;
};
export type QuizFullPrivate = QuizData & {
	questions: QuestionPrivate[];
	completionCount: number;
};
