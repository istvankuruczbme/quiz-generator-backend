import { Request, Response, NextFunction } from "express";
import getQuizFull from "../../../services/db/quiz/getQuizFull";
import { QuizFull, QuizSummary } from "../../../types/quizTypes";
import { QuizQueryType } from "../../../assets/quizQueryTypes";
import getQuizSummary from "../../../services/db/quiz/getQuizSummary";

export default async function getQuizMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz ID from request params
	const { quizId } = req.params as { quizId: string };
	// Get query type from res.locals
	const { queryType } = res.locals as { queryType: QuizQueryType };

	try {
		// Get quiz
		const quiz =
			queryType === "summary" ? await getQuizSummary(quizId) : await getQuizFull(quizId);

		// Add quiz to res.locals
		(res.locals.quiz as QuizSummary | QuizFull) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
