import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import { UpdateQuestionData, updateQuestionSchema } from "./schemas/updateQuestionSchema";

export default function validateUpdateQuestionData(questionData: unknown): UpdateQuestionData {
	// Validation
	const { success, error, data } = updateQuestionSchema.safeParse(questionData);

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
