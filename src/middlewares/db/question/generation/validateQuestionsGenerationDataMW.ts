import { Request, Response, NextFunction } from "express";
import validateQuestionsGenerationData from "../../../../utils/db/question/generation/validation/validateQuestionsGenerationData";
import { SubscriptionFeatures } from "../../../../assets/subscriptionFeatures";
import { QuestionGenerationData } from "../../../../utils/db/question/generation/validation/schemas/questionGenerationSchema";

export default function validateQuestionsGenerationDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz and subscription features from res.locals
	const {
		subscriptionFeatures: { maxQuestionCount, maxAnswerOptionCount },
	} = res.locals as {
		subscriptionFeatures: SubscriptionFeatures;
	};

	try {
		// Validaton
		const generationData = validateQuestionsGenerationData(req.body, {
			maxQuestionCount,
			maxAnswerOptionCount,
		});

		// Add generation data to res.locals
		(res.locals.generationData as QuestionGenerationData) = generationData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
