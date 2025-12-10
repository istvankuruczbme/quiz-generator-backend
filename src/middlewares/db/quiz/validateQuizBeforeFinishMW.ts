import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import AppError from "../../../classes/AppError";

export default function validateQuizBeforeFinishMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizPrivate };

	try {
		// Check if quiz has questions
		if (quiz.questions.length === 0) {
			throw new AppError({
				status: 400,
				message: "Cannot finish quiz without questions.",
				details: "The quiz must have at least one question before it can be finished.",
			});
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
