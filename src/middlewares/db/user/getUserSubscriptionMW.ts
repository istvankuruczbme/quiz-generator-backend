import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import getSubscription from "../../../services/stripe/subscription/getSubscription";
import Stripe from "stripe";
import AppError from "../../../classes/AppError";

export default async function getUserSubscriptionMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	try {
		// No subscription
		if (!user.subscriptionId) {
			throw new AppError({ message: "User has no subscription.", status: 404 });
		}

		// Get subscription
		const subscription = await getSubscription(user.subscriptionId);

		// Add subscription tor res.locals
		(res.locals.subscription as Stripe.Subscription) = subscription;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
