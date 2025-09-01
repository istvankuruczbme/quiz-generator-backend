import { Request, Response, NextFunction } from "express";
import validateUpdateQuestionData from "../../../utils/db/question/validation/validateUpdateQuestionData";
import { UpdateQuestionData } from "../../../utils/db/question/validation/schemas/updateQuestionSchema";

export default function validateUpdateQuestionDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const questionData = validateUpdateQuestionData(req.body);

		// Add question data to res.locals
		(res.locals.questionData as UpdateQuestionData) = questionData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
