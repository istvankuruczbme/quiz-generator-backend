import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import getNumberOfQuizzesByUserIdSinceTime from "../../../services/db/quiz/getNumberOfQuizzesByUserIdSinceTime";
import Stripe from "stripe";

export default async function getNumberOfQuizzesCreatedByUserInPeriodMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and subscription from res.locals
	const { user, subscription } = res.locals as {
		user: UserSelect;
		subscription: Stripe.Subscription;
	};

	// Get when the current billing period has started
	const periodStart = new Date(subscription.current_period_start * 1000);

	try {
		// Get number of quizzes the user created
		const quizCount = await getNumberOfQuizzesByUserIdSinceTime(user.id, periodStart);

		// Add number of quizzes to res.locals
		(res.locals.quizCount as number) = quizCount;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
