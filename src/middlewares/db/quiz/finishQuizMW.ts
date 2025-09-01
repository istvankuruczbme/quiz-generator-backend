import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import updateQuizConfigByQuizId from "../../../services/db/quizConfig/updateQuizConfigByQuizId";

export default async function finishQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz
	const { quiz } = res.locals as { quiz: QuizPrivate };

	try {
		// Update quiz config
		const { state, visibility, questionOrder } = await updateQuizConfigByQuizId(quiz.id, {
			state: "ACTIVE",
		});

		// Update quiz config in res.locals
		(res.locals.quiz as QuizPrivate).config = { state, visibility, questionOrder };

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
