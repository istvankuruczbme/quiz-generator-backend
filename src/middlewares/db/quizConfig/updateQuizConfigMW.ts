import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import updateQuizConfigByQuizId from "../../../services/db/quizConfig/updateQuizConfigByQuizId";
import { UpdateQuizConfigData } from "../../../utils/db/quizConfig/validation/schemas/updateQuizConfigSchema";

export default async function updateQuizConfigMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and quiz config data
	const { quiz, quizConfigData } = res.locals as {
		quiz: QuizPrivate;
		quizConfigData: UpdateQuizConfigData;
	};

	try {
		// Update quiz config
		const { visibility, questionOrder } = await updateQuizConfigByQuizId(quiz.id, quizConfigData);

		// Update quiz in res.locals
		(res.locals.quiz as QuizPrivate).config = {
			...quiz.config,
			visibility,
			questionOrder,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
