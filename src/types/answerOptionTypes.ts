import { AnswerOptionTable } from "../drizzle/schema/answerOption";

export type AnswerOption = typeof AnswerOptionTable.$inferSelect;

type AnswerOptionData = Omit<AnswerOption, "questionId">;

export type AnswerOptionPrivate = AnswerOptionData;
export type AnswerOptionPublic = Omit<AnswerOptionData, "isCorrect">;
