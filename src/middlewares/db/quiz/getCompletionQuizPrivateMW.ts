import { Request, Response, NextFunction } from "express";
import { FinishedCompletionWithQuestions } from "../../../types/completionTypes";
import getCompletionQuizPrivate from "../../../services/db/quiz/getCompletionQuizPrivate";
import { QuizPrivate } from "../../../types/quizTypes";
import { UserSelect } from "../../../types/userTypes";

export default async function getCompletionQuizPrivateMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get completion and user
	const { completion, user } = res.locals as {
		completion: FinishedCompletionWithQuestions;
		user: UserSelect;
	};

	try {
		// Get quiz
		const quiz = await getCompletionQuizPrivate(completion.quiz.id, { userId: user.id });

		// Add quiz to res.locals
		(res.locals.quiz as QuizPrivate) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
