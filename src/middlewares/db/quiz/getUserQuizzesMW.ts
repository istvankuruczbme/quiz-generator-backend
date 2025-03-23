import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import getUserQuizzes from "../../../services/db/quiz/getUserQuizzes";
import { Quiz } from "../../../types/quizTypes";

export default async function getUserQuizzesMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	try {
		// Get quizzes of user
		const quizzes = await getUserQuizzes(user.id);

		// Add quizzes to res.locals
		(res.locals.quizzes as Quiz[]) = quizzes;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
