import { stripe } from "../../../config/stripe";
import addPriceToSubscription from "../subscription/addPriceToSubscription";
import { ProductWithPrice } from "../../../types/stripeTypes";
import sortSubscriptionsByPrice from "../../../utils/stripe/subscription/sortSubscriptionsByPrice";

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
