import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import { UpdateQuizConfigData, updateQuizConfigSchema } from "./schemas/updateQuizConfigSchema";

export default function validateUpdateQuizConfigData(
	quizConfigData: unknown
): UpdateQuizConfigData {
	// Validation
	const { success, error, data } = updateQuizConfigSchema.safeParse(quizConfigData);

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
