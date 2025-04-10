import { Request, Response, NextFunction } from "express";
import validateQuestionsGenerationData from "../../../../utils/db/question/generation/validateQuestionsGenerationData";
import { SubscriptionFeatures } from "../../../../assets/subscriptionFeatures";
import { QuizFullPrivate } from "../../../../types/quizTypes";

export default function validateQuestionsGenerationDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz and subscription features from res.locals
	const {
		quiz,
		subscriptionFeatures: { maxQuestionCount, maxAnswerOptionCount },
	} = res.locals as {
		quiz: QuizFullPrivate;
		subscriptionFeatures: SubscriptionFeatures;
	};
	// Get data from request body
	const {
		strategy,
		creativity,
		questionCount: questionCountUser,
		answerOptionCount,
	} = req.body as {
		strategy: unknown;
		creativity: unknown;
		questionCount: unknown;
		answerOptionCount: unknown;
	};

	try {
		// Validaton
		validateQuestionsGenerationData(strategy, creativity, questionCountUser, answerOptionCount);

		// Validate question count
		if ((questionCountUser as number) > maxQuestionCount - quiz.questions.length) {
			throw new Error("quiz/questions/generation-question-count-invalid");
		}

		// Validate answer option count
		if ((answerOptionCount as number) > maxAnswerOptionCount) {
			throw new Error("quiz/questions/generation-answer-option-count-invalid");
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
