import { Request, Response, NextFunction } from "express";
import validateUpdateQuizData from "../../../utils/db/quiz/validation/validateUpdateQuizData";
import { UpdateQuizData } from "../../../utils/db/quiz/validation/schemas/updateQuizSchema";

export default function validateUpdateQuizDataMW(req: Request, res: Response, next: NextFunction) {
	try {
		// Validation
		const quizData = validateUpdateQuizData(req.body);

		// Add quiz data to res.locals
		(res.locals.quizData as UpdateQuizData) = quizData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
