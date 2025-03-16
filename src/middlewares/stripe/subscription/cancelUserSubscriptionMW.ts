import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import cancelSubscription from "../../services/subscription/cancelSubscription";

export default async function cancelUserSubscriptionMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	// Check if the user has a subscription
	if (user.subscriptionId == null) return next();

	try {
		// Cancel user subscription
		await cancelSubscription(user.subscriptionId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
