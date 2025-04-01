import { Request, Response, NextFunction } from "express";
import updateQuestion from "../../../services/db/question/updateQuestion";

export default function updateQuestionsOrderMW(req: Request, _: Response, next: NextFunction) {
	// Get questions from request body
	const { questionIds } = req.body as { questionIds: string[] };

	try {
		// Update order of questions
		questionIds.forEach(async (id, index) => {
			await updateQuestion(id, { order: index + 1 });
		});

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
