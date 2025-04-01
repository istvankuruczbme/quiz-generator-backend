import { AnswerOptionTable } from "../drizzle/schema/answerOption";

// DB select
export type AnswerOption = typeof AnswerOptionTable.$inferSelect;

// DB insert
export type AnswerOptionUpdatableProperties = Partial<Pick<AnswerOption, "text" | "isCorrect">>;

export type AnswerOptionData = Omit<AnswerOption, "questionId">;

export type AnswerOptionPrivate = AnswerOptionData;
export type AnswerOptionPublic = Omit<AnswerOptionData, "isCorrect">;
