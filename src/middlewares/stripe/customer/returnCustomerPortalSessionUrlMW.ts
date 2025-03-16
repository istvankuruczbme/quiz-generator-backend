import { Request, Response } from "express";
import Stripe from "stripe";

export default async function returnCustomerPortalSessionUrlMW(_: Request, res: Response) {
	// Get session from res.locals
	const { session } = res.locals as { session: Stripe.BillingPortal.Session };

	// Return session URL
	res.status(200).json({ url: session.url });
}
