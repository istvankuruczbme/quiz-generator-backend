import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import {
	CreateCompletionQuestionData,
	createCompletionQuestionSchema,
} from "./schemas/createCompletionQuestionSchema";

export default function validateCreateCompletionQuestion(
	completionQuestionData: unknown
): CreateCompletionQuestionData {
	// Validation
	const { success, error, data } =
		createCompletionQuestionSchema.safeParse(completionQuestionData);

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
