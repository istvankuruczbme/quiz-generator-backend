import AppError from "../../../../../classes/AppError";
import getZodErrorMessages from "../../../../error/getZodErrorMessages";
import {
	QuestionGenerationData,
	questionGenerationSchema,
} from "./schemas/questionGenerationSchema";

export default function validateQuestionsGenerationData(
	generationData: unknown,
	params: { maxQuestionCount: number; maxAnswerOptionCount: number }
): QuestionGenerationData {
	// Validation
	const { success, error, data } = questionGenerationSchema(params).safeParse(generationData);

	// Error handling
	if (!success) {
		throw new AppError({
			message: "Validation error.",
			details: getZodErrorMessages(error as any),
		});
	}

	// Return data
	return data;
}
