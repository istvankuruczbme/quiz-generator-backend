import { Request, Response, NextFunction } from "express";
import { QuizPublic } from "../../../types/quizTypes";
import { UserSelect } from "../../../types/userTypes";
import createCompletion from "../../../services/db/completion/createCompletion";
import { CompletionSelect } from "../../../types/completionTypes";

export default async function createCompletionMW(_: Request, res: Response, next: NextFunction) {
	// Get user and quiz
	const { user, quiz } = res.locals as { quiz: QuizPublic; user: UserSelect };

	try {
		// Create completion
		const completion = await createCompletion({ userId: user.id, quizId: quiz.id });

		// Add completion to res.locals
		(res.locals.completion as CompletionSelect) = completion;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
