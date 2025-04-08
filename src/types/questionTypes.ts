import { QuestionTable } from "../drizzle/schema/question";
import { QuestionPointsTable } from "../drizzle/schema/questionPoints";
import { AnswerOptionPrivate, AnswerOptionPublic } from "./answerOptionTypes";

// DB select
export type QuestionPoints = typeof QuestionPointsTable.$inferSelect;
export type Question = typeof QuestionTable.$inferSelect;

// DB insert
export type QuestionUpdatableProperties = Partial<Pick<Question, "text" | "photoUrl" | "order">>;
export type QuestionPointsUpdatableProperties = Partial<
	Pick<QuestionPoints, "correct" | "wrong" | "empty">
>;

export type QuestionPointsData = Omit<QuestionPoints, "id" | "questionId">;
export type QuestionData = Omit<Question, "quizId">;

type OpenAIAnswerOptionResponse = {
	text: string;
	isCorrect: boolean;
};
export type OpenAIQuestionResponse = {
	text: string;
	answerOptions: OpenAIAnswerOptionResponse[];
};

export type QuestionPublic = QuestionData & {
	points: QuestionPointsData;
	answerOptions: AnswerOptionPublic[];
};
export type QuestionPrivate = QuestionData & {
	points: QuestionPointsData;
	answerOptions: AnswerOptionPrivate[];
};
