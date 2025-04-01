import { Request, Response, NextFunction } from "express";
import validateQuizQuestion from "../../../utils/db/quiz/validateQuizQuestion";

export default async function validateQuizQuestionsMW(
	req: Request,
	_: Response,
	next: NextFunction
) {
	// Get question IDs from request body
	const { questionIds } = req.body as { questionIds: string[] };
	// Get quiz ID from request params
	const { quizId } = req.params as { quizId: string };

	try {
		// Validation
		for (const questionId of questionIds) {
			await validateQuizQuestion(questionId, quizId);
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
