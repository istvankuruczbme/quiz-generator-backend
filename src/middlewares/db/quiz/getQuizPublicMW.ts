import { Request, Response, NextFunction } from "express";
import { QuizPublic } from "../../../types/quizTypes";
import { UserSelect } from "../../../types/userTypes";
import getQuizPublic from "../../../services/db/quiz/getQuizPublic";

export default async function getQuizPublicMW(req: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };
	// Get quiz ID
	const { quizId } = req.params as { quizId: string };

	try {
		// Get quiz
		const quiz = await getQuizPublic(quizId, { userId: user.id });

		// Add quiz to res.locals
		(res.locals.quiz as QuizPublic) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
