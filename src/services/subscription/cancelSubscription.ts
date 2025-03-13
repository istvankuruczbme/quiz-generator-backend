import { stripe } from "../../config/stripe";

export default async function cancelSubscription(id: string): Promise<void> {
	await stripe.subscriptions.cancel(id);
}
