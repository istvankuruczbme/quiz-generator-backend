import { Request, Response, NextFunction } from "express";
import { QuizConfigQuestionOrder, QuizConfigVisibility } from "../../../drizzle/schema/quizConfig";
import { QuizFullPrivate } from "../../../types/quizTypes";
import updateQuizConfigByQuizId from "../../../services/db/quizConfig/updateQuizConfigByQuizId";

export default async function updateQuizConfigMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizFullPrivate };
	// Get data from request body
	const { visibility, questionOrder } = req.body as {
		visibility: QuizConfigVisibility;
		questionOrder: QuizConfigQuestionOrder;
	};

	try {
		// Update quiz config
		await updateQuizConfigByQuizId(quiz.id, { visibility, questionOrder });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
