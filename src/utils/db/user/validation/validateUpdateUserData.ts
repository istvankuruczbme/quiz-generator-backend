import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import { UpdateUserData, updateUserSchema } from "./schemas/upadteUserSchema";

export default function validateUpdateUserData(userData: unknown): UpdateUserData {
	// Validation
	const { success, error, data } = updateUserSchema.safeParse(userData);

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
