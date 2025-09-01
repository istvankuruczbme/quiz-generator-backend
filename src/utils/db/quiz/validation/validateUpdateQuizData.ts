import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import { UpdateQuizData, updateQuizSchema } from "./schemas/updateQuizSchema";

export default function validateUpdateQuizData(quizData: unknown): UpdateQuizData {
	// Validation
	const { success, error, data } = updateQuizSchema.safeParse(quizData);

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
