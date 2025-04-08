import { Request, Response, NextFunction } from "express";
import { QuestionPrivate } from "../../../types/questionTypes";
import updateQuestionPointsByQuestionId from "../../../services/db/questionPoints/updateQuestionPointsByQuestionId";

export default async function updateQuestionPointsMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get question points data from request body
	const {
		points: { correct, wrong, empty },
	} = req.body as {
		points: {
			correct: number;
			wrong: number;
			empty: number;
		};
	};
	// Get question from res.locals
	const { question } = res.locals as { question: QuestionPrivate };

	try {
		// Update question points
		await updateQuestionPointsByQuestionId(question.id, { correct, wrong, empty });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
