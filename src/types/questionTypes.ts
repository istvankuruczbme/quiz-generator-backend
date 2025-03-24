import { QuestionTable } from "../drizzle/schema/question";
import { QuestionPointsTable } from "../drizzle/schema/questionPoints";
import { AnswerOptionPublic } from "./answerOptionTypes";

export type QuestionPoints = typeof QuestionPointsTable.$inferSelect;
export type Quesiton = typeof QuestionTable.$inferSelect;

export type QuestionPointsData = Omit<QuestionPoints, "id" | "questionId">;
export type QuestionData = Omit<Quesiton, "quizId">;

export type QuestionPublic = QuestionData & {
	points: QuestionPointsData;
	answerOptions: AnswerOptionPublic[];
};
