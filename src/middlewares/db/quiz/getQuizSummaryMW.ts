import { Request, Response, NextFunction } from "express";
import getQuizSummary from "../../../services/db/quiz/getQuizSummary";
import { QuizSummary } from "../../../types/quizTypes";

export default async function getQuizSummaryMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz ID from request params
	const { quizId } = req.params as { quizId: string };

	try {
		// Get quiz summary
		const quizSummary = await getQuizSummary(quizId);

		// Add quiz summary to res.locals
		(res.locals.quiz as QuizSummary) = quizSummary;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
