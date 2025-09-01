import z from "zod/v4";

export const updateAnswerOptionSchema = z.object({
	id: z.uuid("Invalid answer option ID."),
	text: z.string().trim().nonempty("Answer option text missing."),
	isCorrect: z.boolean(),
});
export type UpdateAnswerOptionData = z.infer<typeof updateAnswerOptionSchema>;
