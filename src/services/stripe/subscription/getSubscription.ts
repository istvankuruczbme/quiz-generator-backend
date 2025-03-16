import Stripe from "stripe";
import { stripe } from "../../../config/stripe";

export default async function getSubscription(id: string): Promise<Stripe.Subscription> {
	const subscription = await stripe.subscriptions.retrieve(id);
	return subscription;
}
