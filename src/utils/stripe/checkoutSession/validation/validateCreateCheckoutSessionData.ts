import AppError from "../../../../classes/AppError";
import getZodErrorMessages from "../../../error/getZodErrorMessages";
import validatePriceId from "../../price/validatePriceId";
import {
	CreateCheckoutSessionData,
	createCheckoutSessionSchema,
} from "./schemas/createCheckoutSessionSchema";

export default function validateCreateCheckoutSessionData(
	checkoutSessionData: unknown
): CreateCheckoutSessionData {
	// Validation
	const { success, error, data } = createCheckoutSessionSchema.safeParse(checkoutSessionData);

	// Error handling
	if (!success) {
		const details = getZodErrorMessages(error);
		throw new AppError({ message: "Validation error.", details });
	}

	// Return data
	return data;
}
