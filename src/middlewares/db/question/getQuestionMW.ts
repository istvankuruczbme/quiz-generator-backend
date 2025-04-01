import { Request, Response, NextFunction } from "express";
import getQuestion from "../../../services/db/question/getQuestion";
import { QuestionPublic } from "../../../types/questionTypes";

export default async function getQuestionMW(req: Request, res: Response, next: NextFunction) {
	// Get question ID from request params
	const { questionId } = req.params as { questionId: string };

	try {
		// Get question
		const question = await getQuestion(questionId);

		// Add question to res.locals
		(res.locals.question as QuestionPublic) = question;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
