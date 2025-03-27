import { Request, Response, NextFunction } from "express";
import createQuestion from "../../../services/db/question/createQuestion";
import { Question } from "../../../types/questionTypes";

export default async function createQuestionMW(req: Request, res: Response, next: NextFunction) {
	// Get question data from request body
	const { text, order } = req.body as {
		text: string;
		order: string;
	};
	// Get quiz ID from request params
	const { quizId } = req.params as { quizId: string };

	try {
		// Create question
		const question = await createQuestion(text, parseInt(order), quizId);

		// Add question to res.locals
		(res.locals.question as Question) = question;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
