import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import {
	updateUserCategoriesSchema,
	UpdateUserCategoryData,
} from "./schemas/updateUserCategoriesSchema";

export default function validateUpdateUserCategoriesData(
	userCategoriesData: unknown
): UpdateUserCategoryData {
	// Validation
	const { success, error, data } = updateUserCategoriesSchema.safeParse(userCategoriesData);

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
