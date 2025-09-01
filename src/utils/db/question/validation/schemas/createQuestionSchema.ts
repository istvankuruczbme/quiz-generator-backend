import z from "zod/v4";
import { createAnswerOptionSchema } from "../../../answerOption/validation/schemas/createAnswerOptionSchema";

export const createQuestionSchema = z
	.object({
		text: z.string().trim().nonempty("Question text missing."),
		order: z.number("Question order missing.").min(1, "Question order must be min 1."),
		points: z.object({
			correct: z.number("Correct points missing."),
			wrong: z.number("Wrong points missing."),
			empty: z.number("Empty points missing."),
		}),
		answerOptions: z.array(createAnswerOptionSchema).min(1, "Answer options missing."),
	})
	.check((ctx) => {
		// Get answer options
		const { answerOptions } = ctx.value;

		// Check min 1 correct answer
		const correctAnswerOption = answerOptions.find((option) => option.isCorrect);
		if (!correctAnswerOption) {
			ctx.issues.push({
				input: answerOptions,
				path: ["answerOptions"],
				message: "No correct anwer option.",
				code: "custom",
			});
		}
	});
export type CreateQuestionData = z.infer<typeof createQuestionSchema> & { photoUrl?: string };
