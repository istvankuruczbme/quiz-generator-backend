import { Request, Response, NextFunction } from "express";
import validateUUID from "../../../utils/validation/validateUUID";
import AppError from "../../../classes/AppError";

export default function validateQuestionIdMW(req: Request, _: Response, next: NextFunction) {
	// Get question ID from request params
	const { questionId } = req.params;

	try {
		// Validation
		if (!validateUUID(questionId)) {
			throw new AppError({ message: "Invalid question ID.", status: 400 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
