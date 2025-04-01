import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import { User } from "../../../types/userTypes";

export default function validateUserQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get user and quiz from res.locals
	const { user, quiz } = res.locals as { user: User; quiz: QuizFullPrivate };

	try {
		// Validate quiz user
		if (quiz.user.id !== user.id) throw new Error("quiz/not-found");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
