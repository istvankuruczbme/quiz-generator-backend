import z from "zod/v4";
import { questionGenerationStrategySchema } from "./questionGenerationStrategySchema";

export const questionGenerationSchema = (params: {
	maxQuestionCount: number;
	maxAnswerOptionCount: number;
}) => {
	// Get params
	const { maxQuestionCount, maxAnswerOptionCount } = params;

	return z.object({
		strategy: questionGenerationStrategySchema,
		creativity: z
			.number("Creativity missing.")
			.min(0, "Creativity must be at least 0.")
			.max(100, "Creativity cannot be higher than 100%"),
		questionCount: z
			.number("Question count missing.")
			.min(1)
			.max(maxQuestionCount, `Question count cannot be higher then ${maxQuestionCount}`),
		answerOptionCount: z
			.number("Question count missing.")
			.min(1)
			.max(
				maxAnswerOptionCount,
				`Answer option count for a question cannot be higher then ${maxAnswerOptionCount}`
			),
	});
};
export type QuestionGenerationData = z.infer<ReturnType<typeof questionGenerationSchema>>;
