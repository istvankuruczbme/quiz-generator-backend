import Stripe from "stripe";
import { stripe } from "../../../config/stripe";

export default async function createCustomerPortalSession(customerPortalSessionData: {
	customerId: string;
}): Promise<Stripe.BillingPortal.Session> {
	// Get customer portal session properties
	const { customerId } = customerPortalSessionData;

	// Create session
	const session = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: `${process.env.CLIENT_URL}/profile`,
	});

	// Return session
	return session;
}
