import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import updateQuizConfigByQuizId from "../../../services/db/quizConfig/updateQuizConfigByQuizId";

export default async function finishQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizFullPrivate };

	try {
		// Update quiz config
		await updateQuizConfigByQuizId(quiz.id, { state: "ACTIVE" });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
