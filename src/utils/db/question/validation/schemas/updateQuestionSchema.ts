import z from "zod/v4";
import { updateAnswerOptionSchema } from "../../../answerOption/validation/schemas/updateAnswerOptionSchema";

export const updateQuestionSchema = z
	.object({
		text: z.string().trim().nonempty("Question text missing."),
		photoUrl: z.union([z.url("Invalid photo URL."), z.null()]),
		points: z.object({
			correct: z.number("Correct points missing."),
			wrong: z.number("Wrong points missing."),
			empty: z.number("Empty points missing."),
		}),
		answerOptions: z.array(updateAnswerOptionSchema).min(1, "Answer options missing."),
	})
	.partial()
	.check((ctx) => {
		// Get answer options
		const { answerOptions } = ctx.value;

		// Check min 1 correct answer
		if (answerOptions) {
			const correctAnswerOption = answerOptions.find((option) => option.isCorrect);
			if (!correctAnswerOption) {
				ctx.issues.push({
					input: answerOptions,
					path: ["answerOptions"],
					message: "No correct anwer option.",
					code: "custom",
				});
			}
		}
	});
export type UpdateQuestionData = z.infer<typeof updateQuestionSchema>;
