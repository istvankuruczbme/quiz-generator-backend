import { stripe } from "../../../config/stripe";
import addPriceToSubscription from "../subscription/addPriceToSubscription";
import sortSubscriptionsByPrice from "../../../utils/subscription/sortSubscriptionsByPrice";
import { ProductWithPrice } from "../../../types/stripeTypes";

export default async function getProducts(): Promise<ProductWithPrice[]> {
	// Get subscriptions
	const { data } = await stripe.products.list();

	// Get subscription price
	const subscriptions = await Promise.all(
		data.map(async (subscription) => await addPriceToSubscription(subscription))
	);

	// Sort subscriptions by price
	const sortedSubscriptions = sortSubscriptionsByPrice(subscriptions);

	// Return subscriptions
	return sortedSubscriptions;
}
