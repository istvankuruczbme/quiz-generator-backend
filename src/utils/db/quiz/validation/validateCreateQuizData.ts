import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import { CreateQuizData, createQuizSchema } from "./schemas/createQuizSchema";

export default function validateCreateQuizData(quizData: unknown): CreateQuizData {
	// Validation
	const { success, error, data } = createQuizSchema.safeParse(quizData);

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
