import validatePriceId from "../../utils/subscription/validatePriceId";

export default function validateNewSubscriptionData(priceId: unknown): void {
	validatePriceId(priceId, "subscription/price-");
}
