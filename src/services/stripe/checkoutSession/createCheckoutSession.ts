import Stripe from "stripe";
import { stripe } from "../../../config/stripe";

export default async function createCheckoutSession(checkoutSessionData: {
	customerId: string;
	priceId: string;
	successUrl?: string;
}): Promise<Stripe.Checkout.Session> {
	// Get checkout session data
	const { customerId, priceId, successUrl } = checkoutSessionData;

	// Create session
	const session = await stripe.checkout.sessions.create({
		customer: customerId,
		mode: "subscription",
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
		success_url: `${process.env.CLIENT_URL}${successUrl || "/profile/subscription?success"}`,
		cancel_url: `${process.env.CLIENT_URL}/profile/subscription?cancel`,
	});

	// Return session
	return session;
}
