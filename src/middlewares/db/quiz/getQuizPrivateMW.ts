import { Request, Response, NextFunction } from "express";
import getQuizPrivate from "../../../services/db/quiz/getQuizPrivate";
import { QuizPrivate } from "../../../types/quizTypes";
import { UserSelect } from "../../../types/userTypes";

export default async function getQuizPrivateMW(req: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };
	// Get quiz ID
	const { quizId } = req.params as { quizId: string };

	try {
		// Get quiz
		const quiz = await getQuizPrivate(quizId, { userId: user.id });

		// Add quiz to res.locals
		(res.locals.quiz as QuizPrivate) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
