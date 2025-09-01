import { Request, Response, NextFunction } from "express";
import getQuizSummary from "../../../services/db/quiz/getQuizSummary";
import { QuizSummary } from "../../../types/quizTypes";
import { UserSelect } from "../../../types/userTypes";

export default async function getQuizSummaryMW(req: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };
	// Get quiz ID
	const { quizId } = req.params as { quizId: string };

	try {
		// Get quiz summary
		const quizSummary = await getQuizSummary(quizId, { userId: user.id });

		// Add quiz summary to res.locals
		(res.locals.quiz as QuizSummary) = quizSummary;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
