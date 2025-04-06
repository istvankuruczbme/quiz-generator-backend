import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import { QuizSummary } from "../../../types/quizTypes";
import validateQuizReadAction from "../../../utils/db/quiz/validateQuizReadAction";

export default function validateQuizReadActionMW(_: Request, res: Response, next: NextFunction) {
	// Get user and quiz from res.locals
	const { user, quiz } = res.locals as { user: User; quiz: QuizSummary };

	try {
		// Validation
		validateQuizReadAction(quiz, user);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
