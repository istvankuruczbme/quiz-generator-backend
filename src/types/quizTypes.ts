import { QuizTable } from "../drizzle/schema/quiz";
import { QuizConfigTable } from "../drizzle/schema/quizConfig";
import { Category } from "./categoryTypes";

export type QuizDB = typeof QuizTable.$inferSelect;
export type QuizConfigDB = typeof QuizConfigTable.$inferSelect;

export type QuizConfig = Omit<QuizConfigDB, "quizId">;
export type Quiz = Omit<QuizDB, "categoryId" | "userId"> & {
	config: QuizConfig;
	category: Category;
};
