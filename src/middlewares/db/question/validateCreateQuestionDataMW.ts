import { Request, Response, NextFunction } from "express";
import validateCreateQuestionData from "../../../utils/db/question/validation/validateCreateQuestionData";
import { CreateQuestionData } from "../../../utils/db/question/validation/schemas/createQuestionSchema";

export default function validateCreateQuestionDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const questionData = validateCreateQuestionData(req.body);

		// Add question data to res.locals
		(res.locals.questionData as CreateQuestionData) = questionData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
