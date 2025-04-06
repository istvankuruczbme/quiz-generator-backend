import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import subscriptionFeatures from "../../../assets/subscriptionFeatures";
import getProductIdFromSubscription from "../../../utils/stripe/subscription/getProductIdFromSubscription";

export default async function validateCreateQuizAccessMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get subscription of user and quiz count from res.locals
	const { subscription, quizCount } = res.locals as {
		subscription: Stripe.Subscription;
		quizCount: number;
	};

	try {
		// Get product ID from subscription
		const productId = getProductIdFromSubscription(subscription);

		// Get max quiz count for this product
		const maxQuizCount = subscriptionFeatures[productId].maxQuizCount;

		// Check if user is under the limit
		if (quizCount >= maxQuizCount) throw new Error("user/max-number-of-quizzes-reached");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
