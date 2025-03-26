import { Request, Response, NextFunction } from "express";
import validateUUID from "../../../utils/validation/validateUUID";

export default function validateQuizIdMW(req: Request, _: Response, next: NextFunction) {
	// Get quiz ID from request params
	const { quizId } = req.params;

	try {
		// Validation
		validateUUID(quizId, "quiz/");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
