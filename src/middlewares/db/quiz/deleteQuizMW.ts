import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import deleteQuiz from "../../../services/db/quiz/deleteQuiz";

export default async function deleteQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz
	const { quiz } = res.locals as { quiz: QuizPrivate };

	try {
		// Delete quiz
		await deleteQuiz(quiz.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
