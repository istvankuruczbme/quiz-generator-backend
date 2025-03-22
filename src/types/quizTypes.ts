import { QuizTable } from "../drizzle/schema/quiz";
import { QuizConfigTable } from "../drizzle/schema/quizConfig";

export type Quiz = typeof QuizTable.$inferSelect;
export type QuizConfig = typeof QuizConfigTable.$inferSelect;

export type QuizWithConfig = Quiz & { config: QuizConfig };
