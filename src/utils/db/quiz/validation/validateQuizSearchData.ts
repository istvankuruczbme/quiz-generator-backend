import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import { QuizSearchData, quizSearchSchema } from "./schemas/quizSearchSchema";

export default function validateQuizSearchData(searchData: unknown): QuizSearchData {
	// Validation
	const { success, error, data } = quizSearchSchema.safeParse(searchData);

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
