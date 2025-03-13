import Stripe from "stripe";
import { stripe } from "../../config/stripe";

export default async function createCustomerPortalSession(
	customerId: string
): Promise<Stripe.BillingPortal.Session> {
	const session = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: `${process.env.CLIENT_URL}/profile`,
	});
	return session;
}
