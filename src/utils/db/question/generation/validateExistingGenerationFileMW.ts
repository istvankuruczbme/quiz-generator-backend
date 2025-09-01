import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../../types/quizTypes";
import getQuizDocuments from "../../../../services/db/quiz/getQuizDocuments";
import { SubscriptionFeatures } from "../../../../assets/subscriptionFeatures";
import AppError from "../../../../classes/AppError";

export default async function validateExistingGenerationFileMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz and subscription features from res.locas
	const { quiz, subscriptionFeatures } = res.locals as {
		quiz: QuizPrivate;
		subscriptionFeatures: SubscriptionFeatures;
	};

	try {
		// Validation
		const documents = await getQuizDocuments(quiz.id);
		if (documents.length - 1 >= subscriptionFeatures.maxDocCountPerQuiz) {
			throw new AppError({ message: "Document limit reached for this quiz.", status: 400 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
