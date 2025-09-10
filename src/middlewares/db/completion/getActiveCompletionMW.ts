import { Request, Response, NextFunction } from "express";
import { QuizPublic } from "../../../types/quizTypes";
import getActiveCompletion from "../../../services/db/completion/getActiveCompletion";
import { ActiveCompletionWithQuestions } from "../../../types/completionTypes";

export default async function getActiveCompletionMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get completion ID
	const { completionId } = req.params as { completionId: string };
	// Get quiz
	const { quiz } = res.locals as { quiz: QuizPublic };

	try {
		// Get completion
		const completion = await getActiveCompletion(completionId, { quizId: quiz.id });

		// Add completion to res.locals
		(res.locals.completion as ActiveCompletionWithQuestions) = completion;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
