import { Request, Response, NextFunction } from "express";
import validateUUID from "../../../utils/validation/validateUUID";
import AppError from "../../../classes/AppError";

export default function validateCompletionIdMW(req: Request, _: Response, next: NextFunction) {
	// Get completion ID
	const { completionId } = req.params;

	try {
		// Validation
		if (!validateUUID(completionId)) {
			throw new AppError({ message: "Invalid quiz completion ID.", status: 400 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
