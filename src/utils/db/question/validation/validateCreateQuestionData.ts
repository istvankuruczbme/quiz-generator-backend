import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import { CreateQuestionData, createQuestionSchema } from "./schemas/createQuestionSchema";

export default function validateCreateQuestionData(questionData: unknown): CreateQuestionData {
	// Validation
	const { success, error, data } = createQuestionSchema.safeParse(questionData);

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
