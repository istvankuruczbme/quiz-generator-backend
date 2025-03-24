import validatePriceId from "../price/validatePriceId";

export default function validateCheckoutSessionData(priceId: unknown, successUrl: unknown): void {
	validatePriceId(priceId, "price/");
	if (successUrl != undefined && (typeof successUrl !== "string" || successUrl === "")) {
		throw new Error("checkout-session/invalid-url");
	}
}
