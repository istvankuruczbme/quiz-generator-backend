import { ProductWithPrice } from "../../../types/stripeTypes";

export default function sortSubscriptionsByPrice(
	subscriptions: ProductWithPrice[]
): ProductWithPrice[] {
	return subscriptions.toSorted((a, b) => {
		if (
			a.default_price == null ||
			typeof a.default_price === "string" ||
			a.default_price.unit_amount == null
		)
			return 1;
		if (
			b.default_price == null ||
			typeof b.default_price === "string" ||
			b.default_price.unit_amount == null
		)
			return -1;
		return a.default_price.unit_amount - b.default_price.unit_amount;
	});
}
