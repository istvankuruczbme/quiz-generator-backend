import { Request, Response, NextFunction } from "express";
import validateUUID from "../../../utils/validation/validateUUID";
import AppError from "../../../classes/AppError";

export default function validateQuizIdMW(req: Request, _: Response, next: NextFunction) {
	// Get quiz ID
	const { quizId } = req.params;

	try {
		// Validation
		if (!validateUUID(quizId)) throw new AppError({ message: "Invalid quiz ID.", status: 400 });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
