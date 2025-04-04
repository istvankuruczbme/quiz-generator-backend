import { Request, Response, NextFunction } from "express";
import validateQuizConfigData from "../../../utils/db/quizConfig/validateQuizConfigData";

export default function validateQuizConfigDataMW(req: Request, _: Response, next: NextFunction) {
	// Get data from request body
	const { visibility, questionOrder } = req.body as {
		visibility: unknown;
		questionOrder: unknown;
	};

	try {
		// Validation
		validateQuizConfigData(visibility, questionOrder);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
