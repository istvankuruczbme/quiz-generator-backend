import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import getSubscription from "../../services/subscription/getSubscription";
import Stripe from "stripe";

export default async function getUserSubscriptionMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	// Check if the user has a subscription
	if (user.subscriptionId == null) {
		return next(new Error("user/subscription-missing"));
	}

	try {
		// Get user's subscription
		const subscription = await getSubscription(user.subscriptionId);

		// Add subscription tor res.locals
		(res.locals.subscription as Stripe.Subscription) = subscription;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
