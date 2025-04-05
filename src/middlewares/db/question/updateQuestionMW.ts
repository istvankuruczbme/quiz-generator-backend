import { Request, Response, NextFunction } from "express";
import { QuestionPrivate } from "../../../types/questionTypes";
import updateQuestion from "../../../services/db/question/updateQuestion";

export default async function updateQuestionMW(req: Request, res: Response, next: NextFunction) {
	// Get question from res.locals
	const { question } = res.locals as {
		question: QuestionPrivate;
	};
	// Get question data from request body
	const { text } = req.body as {
		text: string;
	};

	try {
		// Update question
		await updateQuestion(question.id, { text });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
