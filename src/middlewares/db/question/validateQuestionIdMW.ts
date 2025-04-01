import { Request, Response, NextFunction } from "express";
import validateUUID from "../../../utils/validation/validateUUID";

export default function validateQuestionIdMW(req: Request, _: Response, next: NextFunction) {
	// Get question ID from request params
	const { questionId } = req.params;

	try {
		// Validation
		validateUUID(questionId, "question/");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
