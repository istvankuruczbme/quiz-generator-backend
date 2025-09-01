import { Request, Response, NextFunction } from "express";
import { UpdateQuizConfigData } from "../../../utils/db/quizConfig/validation/schemas/updateQuizConfigSchema";
import validateUpdateQuizConfigData from "../../../utils/db/quizConfig/validation/validateUpdateQuizConfigData";

export default function validateUpdateQuizConfigDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const quizConfigData = validateUpdateQuizConfigData(req.body);

		// Add quiz config data to res.locals
		(res.locals.quizConfigData as UpdateQuizConfigData) = quizConfigData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
