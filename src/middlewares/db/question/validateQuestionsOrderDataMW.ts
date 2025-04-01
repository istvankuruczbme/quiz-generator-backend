import { Request, Response, NextFunction } from "express";
import validateQuestionsOrderData from "../../../utils/db/question/validateQuestionsOrderData";

export default function validateQuestionsOrderDataMW(
	req: Request,
	_: Response,
	next: NextFunction
) {
	// Get order of questions from request body
	const { questionIds } = req.body as { questionIds: unknown };

	try {
		// Validation
		validateQuestionsOrderData(questionIds);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
