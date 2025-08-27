import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import { QuizSummary } from "../../../types/quizTypes";
import getQuizSummariesByUserId from "../../../services/db/quiz/getQuizSummariesByUserId";

export default async function getUserQuizSummariesMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get quiz summaries of user
		const quizSummaries = await getQuizSummariesByUserId(user.id);

		// Add quiz summaries to res.locals
		(res.locals.quizSummaries as QuizSummary[]) = quizSummaries;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
