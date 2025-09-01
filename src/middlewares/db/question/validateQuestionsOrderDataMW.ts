import { Request, Response, NextFunction } from "express";
import validateQuestionsOrderData from "../../../utils/db/question/validation/validateQuestionsOrderData";
import { QuestionsOrderData } from "../../../utils/db/question/validation/schemas/questionsOrderSchema";

export default function validateQuestionsOrderDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const questionsOrderData = validateQuestionsOrderData(req.body);

		// Add questions order data to res.locals
		(res.locals.questionsOrderData as QuestionsOrderData) = questionsOrderData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
