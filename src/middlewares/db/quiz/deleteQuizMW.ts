import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import deleteQuiz from "../../../services/db/quiz/deleteQuiz";

export default async function deleteQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizFullPrivate };

	try {
		// Delete quiz
		await deleteQuiz(quiz.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
