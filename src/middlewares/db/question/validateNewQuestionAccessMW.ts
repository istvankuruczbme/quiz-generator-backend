import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { QuizFullPrivate } from "../../../types/quizTypes";
import getProductIdFromSubscription from "../../../utils/stripe/subscription/getProductIdFromSubscription";
import subscriptionFeatures from "../../../assets/subscriptionFeatures";

export default function validateNewQuestionAccessMW(_: Request, res: Response, next: NextFunction) {
	// Get subscription of user and quiz from res.locals
	const { subscription, quiz } = res.locals as {
		subscription: Stripe.Subscription;
		quiz: QuizFullPrivate;
	};

	try {
		// Get product ID from subscription
		const productId = getProductIdFromSubscription(subscription);

		// Get max quiz count for this product
		const maxQuestionCount = subscriptionFeatures[productId].maxQuestionCountPerQuiz;

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
