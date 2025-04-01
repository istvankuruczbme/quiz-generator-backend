import { Request, Response, NextFunction } from "express";
import getQuiz from "../../../services/db/quiz/getQuiz";
import { QuizFullPrivate } from "../../../types/quizTypes";

export default async function getQuizMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz ID from request params
	const { quizId } = req.params as { quizId: string };

	try {
		// Get quiz
		const quiz = await getQuiz(quizId);

		// Add quiz to res.locals
		(res.locals.quiz as QuizFullPrivate) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
