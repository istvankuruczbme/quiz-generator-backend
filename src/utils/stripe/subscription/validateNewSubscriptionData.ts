import validatePriceId from "../price/validatePriceId";

export default function validateNewSubscriptionData(priceId: unknown): void {
	validatePriceId(priceId, "subscription/price-");
}
