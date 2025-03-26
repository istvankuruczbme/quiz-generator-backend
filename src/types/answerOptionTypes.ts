import { AnswerOptionTable } from "../drizzle/schema/answerOption";

export type AnswerOption = typeof AnswerOptionTable.$inferSelect;

export type AnswerOptionData = Omit<AnswerOption, "questionId">;

export type AnswerOptionInput = Omit<AnswerOptionData, "id">;

export type AnswerOptionPrivate = AnswerOptionData;
export type AnswerOptionPublic = Omit<AnswerOptionData, "isCorrect">;
