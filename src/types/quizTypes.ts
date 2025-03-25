import { CategoryName } from "../drizzle/schema/category";
import { QuizTable } from "../drizzle/schema/quiz";
import { QuizConfigTable } from "../drizzle/schema/quizConfig";
import { QuestionPublic } from "./questionTypes";
import { UserPublic } from "./userTypes";

export type QuizConfig = typeof QuizConfigTable.$inferSelect;
export type Quiz = typeof QuizTable.$inferSelect;

export type QuizConfigData = Pick<QuizConfig, "status" | "visibility" | "questionOrder">;
export type QuizData = Pick<
	Quiz,
	"id" | "title" | "description" | "photoUrl" | "updatedAt" | "createdAt"
> & {
	config: QuizConfigData;
	category: CategoryName;
	user: UserPublic;
};

export type QuizSummary = QuizData & {
	questionCount: number;
	completionCount: number;
};

export type QuizFull = QuizData & {
	questions: QuestionPublic[];
};
