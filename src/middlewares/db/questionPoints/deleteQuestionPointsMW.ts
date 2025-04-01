import { Request, Response, NextFunction } from "express";
import { QuestionPrivate, QuestionPublic } from "../../../types/questionTypes";
import deleteQuestionPointsByQuestionId from "../../../services/db/questionPoints/deleteQuestionPointsByQuestionId";

export default async function deleteQuestionPointsMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get question from res.locals
	const { question } = res.locals as { question: QuestionPrivate | QuestionPublic };

	try {
		// Delete question points
		await deleteQuestionPointsByQuestionId(question.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
