import validateCustomerId from "../../utils/subscription/validateCustomerId";
import validatePriceId from "../../utils/subscription/validatePriceId";

export default function validateCheckoutSessionData(
	customerId: unknown,
	priceId: unknown,
	successUrl: unknown
): void {
	validateCustomerId(customerId, "customer/");
	validatePriceId(priceId, "price/");
	if (successUrl != undefined && (typeof successUrl !== "string" || successUrl === "")) {
		throw new Error("checkout-session/invalid-url");
	}
}
