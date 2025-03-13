import { Request, Response, NextFunction } from "express";
import validateEmail from "../../utils/validation/validateEmail";

export default function validateUserEmailMW(req: Request, _: Response, next: NextFunction) {
	// Get email
	const { email } = req.body as { email: unknown };

	try {
		// Validation
		validateEmail(email, "user/");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
