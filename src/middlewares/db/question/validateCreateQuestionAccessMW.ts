import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import { SubscriptionFeatures } from "../../../assets/subscriptionFeatures";
import AppError from "../../../classes/AppError";

export default function validateCreateQuestionAccessMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz and subscription features from res.locals
	const {
		quiz,
		subscriptionFeatures: { maxQuestionCount },
	} = res.locals as {
		quiz: QuizPrivate;
		subscriptionFeatures: SubscriptionFeatures;
	};

	try {
		// Check if user is under the limit
		if (quiz.questions.length >= maxQuestionCount) {
			throw new AppError({ message: "Question limit reached for this quiz.", status: 403 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
