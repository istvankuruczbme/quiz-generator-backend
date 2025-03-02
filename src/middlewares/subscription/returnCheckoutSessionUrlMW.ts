import { Request, Response } from "express";
import Stripe from "stripe";

export default function returnCheckoutSessionUrlMW(_: Request, res: Response) {
	// Get session from res.locals
	const { session } = res.locals as { session: Stripe.Checkout.Session };

	// Return session URL
	res.status(200).json({ url: session.url as string });
}
