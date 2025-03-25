import { Request, Response, NextFunction } from "express";
import getQuizFull from "../../../services/db/quiz/getQuizFull";
import { QuizFullPrivate, QuizFullPublic, QuizSummary } from "../../../types/quizTypes";
import { QuizQueryType } from "../../../assets/quizQueryTypes";
import getQuizSummary from "../../../services/db/quiz/getQuizSummary";
import { User } from "../../../types/userTypes";

export default async function getQuizMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz ID from request params
	const { quizId } = req.params as { quizId: string };
	// Get user and query type from res.locals
	const { user, queryType } = res.locals as { user: User; queryType: QuizQueryType };

	try {
		// Get quiz
		const quiz =
			queryType === "summary"
				? await getQuizSummary(quizId)
				: await getQuizFull(quizId, user.id);

		// Add quiz to res.locals
		(res.locals.quiz as QuizSummary | QuizFullPublic | QuizFullPrivate) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
