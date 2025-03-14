import Stripe from "stripe";
import { stripe } from "../../config/stripe";

export default async function updateSubscription(
	subscription: Stripe.Subscription,
	priceId: string
): Promise<void> {
	// Get subscription item
	const subscriptionItem = subscription.items.data[0];

	// Check if subscription item exists
	if (subscriptionItem == undefined) throw new Error("subscription/item-missing");

	// Check same price ID
	if (subscriptionItem.price.id === priceId) throw new Error("subscription/same-plan");

	// Update subscription
	await stripe.subscriptions.update(subscription.id, {
		items: [
			{
				id: subscriptionItem.id,
				price: priceId,
			},
		],
		proration_behavior: "create_prorations",
	});
}
