import { QuestionTable } from "../drizzle/schema/question";
import { QuestionPointsTable } from "../drizzle/schema/questionPoints";
import { AnswerOptionPrivate, AnswerOptionPublic } from "./answerOptionTypes";
import { QuestionPoints } from "./questionPointsTypes";

// #region DB types
export type QuestionSelect = typeof QuestionTable.$inferSelect;
export type QuestionInsert = typeof QuestionTable.$inferInsert;
export type QuestionUpdate = Partial<Omit<QuestionSelect, "id" | "quizId">>;
//#endregion

// #region Question public
export type QuestionPublic = Omit<QuestionSelect, "quizId"> & {
	points: QuestionPoints;
	answerOptions: AnswerOptionPublic[];
};
//#endregion

// #region Question private
export type QuestionPrivate = Omit<QuestionSelect, "quizId"> & {
	points: QuestionPoints;
	answerOptions: AnswerOptionPrivate[];
};
//#endregion

//#region OpenAI question
type OpenAIAnswerOptionResponse = {
	text: string;
	isCorrect: boolean;
};
export type OpenAIQuestionResponse = {
	text: string;
	answerOptions: OpenAIAnswerOptionResponse[];
};
//#endregion
