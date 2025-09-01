import { Request, Response, NextFunction } from "express";
import { SubscriptionFeatures } from "../../../assets/subscriptionFeatures";
import AppError from "../../../classes/AppError";

export default async function checkCreateQuizAccessMW(
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
		if (quizCount >= maxQuizCountPerPeriod) {
			throw new AppError({
				message: "Quiz limit reached in the current billing period.",
				status: 403,
			});
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
