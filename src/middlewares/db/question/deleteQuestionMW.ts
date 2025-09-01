import { Request, Response, NextFunction } from "express";
import { QuestionPrivate } from "../../../types/questionTypes";
import deleteQuestion from "../../../services/db/question/deleteQuestion";

export default async function deleteQuestionMW(_: Request, res: Response, next: NextFunction) {
	// Get questions
	const { question } = res.locals as { question: QuestionPrivate };

	try {
		// Delete question
		await deleteQuestion(question.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
