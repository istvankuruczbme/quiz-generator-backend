import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import updateSubscription from "../../services/subscription/updateSubscription";

export default async function updateUserSubscriptionMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get subscription from res.locals
	const { subscription } = res.locals as { subscription: Stripe.Subscription };
	// Get new subscription data from req.body
	const { priceId } = req.body as { priceId: string };

	try {
		// Update subscripition
		await updateSubscription(subscription, priceId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
