import { Request, Response, NextFunction } from "express";
import { SubscriptionFeatures } from "../../../assets/subscriptionFeatures";

export default async function validateCreateQuizAccessMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz count and subscription features from res.locals
	const {
		quizCount,
		subscriptionFeatures: { maxQuizCountPerPeriod },
	} = res.locals as {
		quizCount: number;
		subscriptionFeatures: SubscriptionFeatures;
	};

	try {
		// Check if user is under the limit
		if (quizCount >= maxQuizCountPerPeriod) throw new Error("user/max-number-of-quizzes-reached");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
