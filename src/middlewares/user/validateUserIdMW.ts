import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/validation/validateUUID";

export default function validateUserIdMW(_: Request, res: Response, next: NextFunction) {
	// Get userId from res.locals
	const { userId } = res.locals as { userId: unknown };

	try {
		// Validation
		validateUUID(userId, "user/");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
