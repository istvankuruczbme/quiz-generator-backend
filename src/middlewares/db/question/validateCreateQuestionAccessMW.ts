import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import { SubscriptionFeatures } from "../../../assets/subscriptionFeatures";

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
		quiz: QuizFullPrivate;
		subscriptionFeatures: SubscriptionFeatures;
	};

	try {
		// Check if user is under the limit
		if (quiz.questions.length >= maxQuestionCount) {
			throw new Error("quiz/max-number-of-questions-reached");
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
