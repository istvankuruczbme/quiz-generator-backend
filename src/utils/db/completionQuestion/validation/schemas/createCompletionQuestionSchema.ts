import { z } from "zod/v4";

export const createCompletionQuestionSchema = z.object({
	selectedAnswerOptions: z
		.array(z.uuid("Invalid answer option ID."))
		.min(1, "Min 1 answer option must be selected."),
	questionId: z.uuid("Invalid question ID."),
});
export type CreateCompletionQuestionData = z.infer<typeof createCompletionQuestionSchema>;
