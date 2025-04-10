import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../../types/quizTypes";
import getQuizDocuments from "../../../../services/db/quiz/getQuizDocuments";
import { SubscriptionFeatures } from "../../../../assets/subscriptionFeatures";

export default async function validateExistingGenerationFileMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz and subscription features from res.locas
	const { quiz, subscriptionFeatures } = res.locals as {
		quiz: QuizFullPrivate;
		subscriptionFeatures: SubscriptionFeatures;
	};

	try {
		// Validation
		const documents = await getQuizDocuments(quiz.id);
		if (documents.length - 1 >= subscriptionFeatures.maxDocCountPerQuiz) {
			throw new Error("quiz/questions/generation-doc-count-limit-reached");
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
