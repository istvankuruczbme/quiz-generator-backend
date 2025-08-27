import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import validateQuizWriteAction from "../../../utils/db/quiz/validateQuizWriteAction";
import { UserSelect } from "../../../types/userTypes";

export default function validateQuizWriteActionMW(_: Request, res: Response, next: NextFunction) {
	// Get user and quiz from res.locals
	const { user, quiz } = res.locals as { user: UserSelect; quiz: QuizFullPrivate };

	try {
		// Validate if quiz can be modified
		validateQuizWriteAction(quiz, user);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
