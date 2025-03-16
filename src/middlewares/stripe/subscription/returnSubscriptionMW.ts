import { Request, Response } from "express";
import Stripe from "stripe";

export default function returnSubscriptionMW(_: Request, res: Response) {
	// Get subscription from res.locals
	const { subscription } = res.locals as { subscription: Stripe.Subscription };

	// Send response
	res.status(200).json(subscription);
}
