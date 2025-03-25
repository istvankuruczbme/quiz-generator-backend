import { Request, Response, NextFunction } from "express";
import { QuizFull, QuizSummary } from "../../../types/quizTypes";
import { User } from "../../../types/userTypes";

export default async function checkQuizAccessMW(_: Request, res: Response, next: NextFunction) {
	// Get user and quiz from res.locals
	const { user, quiz } = res.locals as { user: User; quiz: QuizSummary | QuizFull };

	// Check access
	if (quiz.config.visibility === "PRIVATE" && quiz.user.id !== user.id) {
		return next(new Error("quiz/not-found"));
	}

	// Go to next MW
	return next();
}
