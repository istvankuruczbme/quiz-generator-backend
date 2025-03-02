import Stripe from "stripe";
import getPricebyId from "./getPricebyId";
import { ProductWithPrice } from "../../types/stripeTypes";

export default async function addPriceToSubscription(
	subscription: Stripe.Product
): Promise<ProductWithPrice> {
	// Get price
	const price = await getPricebyId(subscription.default_price as string);

	// Update default price
	const subscriptionWithPrice: ProductWithPrice = { ...subscription, default_price: price };

	// Return subscription
	return subscriptionWithPrice;
}
