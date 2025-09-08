import { Request, Response, NextFunction } from "express";
import validateCreateCompletionQuestion from "../../../utils/db/completionQuestion/validation/validateCreateCompletionQuestion";
import { CreateCompletionQuestionData } from "../../../utils/db/completionQuestion/validation/schemas/createCompletionQuestionSchema";

export default function validateCreateCompletionQuestionMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const completionQuestionData = validateCreateCompletionQuestion(req.body);

		// Add validated data to res.locals
		(res.locals.completionQuestionData as CreateCompletionQuestionData) = completionQuestionData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
