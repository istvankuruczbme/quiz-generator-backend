import { QuestionTable } from "../drizzle/schema/question";
import { QuestionPointsTable } from "../drizzle/schema/questionPoints";
import { AnswerOptionPrivate, AnswerOptionPublic } from "./answerOptionTypes";

export type QuestionPoints = typeof QuestionPointsTable.$inferSelect;
export type Question = typeof QuestionTable.$inferSelect;

export type QuestionPointsData = Omit<QuestionPoints, "id" | "questionId">;
export type QuestionData = Omit<Question, "quizId">;

export type QuestionPublic = QuestionData & {
	points: QuestionPointsData;
	answerOptions: AnswerOptionPublic[];
};
export type QuestionPrivate = QuestionData & {
	points: QuestionPointsData;
	answerOptions: AnswerOptionPrivate[];
};
