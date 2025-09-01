import { Request, Response, NextFunction } from "express";
import validateCreateQuizData from "../../../utils/db/quiz/validation/validateCreateQuizData";
import { CreateQuizData } from "../../../utils/db/quiz/validation/schemas/createQuizSchema";

export default async function validateCreateQuizDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const quizData = validateCreateQuizData(req.body);

		// Add quiz data to res.locals
		(res.locals.quizData as CreateQuizData) = quizData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
