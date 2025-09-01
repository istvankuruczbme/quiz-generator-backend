import z from "zod/v4";

export const createAnswerOptionSchema = z.object({
	text: z.string().trim().nonempty("Answer option text missing."),
	isCorrect: z.boolean(),
});
export type CreateAnswerOptionData = z.infer<typeof createAnswerOptionSchema>;
