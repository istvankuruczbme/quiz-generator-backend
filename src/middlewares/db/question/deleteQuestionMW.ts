import { Request, Response, NextFunction } from "express";
import { QuestionPrivate, QuestionPublic } from "../../../types/questionTypes";
import deleteQuestion from "../../../services/db/question/deleteQuestion";

export default async function deleteQuestionMW(_: Request, res: Response, next: NextFunction) {
	// Get question from res.locals
	const { question } = res.locals as { question: QuestionPrivate | QuestionPublic };

	try {
		// Delete question
		await deleteQuestion(question.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
