import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import { QuestionsOrderData, questionsOrderSchema } from "./schemas/questionsOrderSchema";

export default function validateQuestionsOrderData(
	questionsOrderData: unknown
): QuestionsOrderData {
	// Validation
	const { success, error, data } = questionsOrderSchema.safeParse(questionsOrderData);

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
