import { Request, Response, NextFunction } from "express";
import validateUserPersonalData from "../../services/user/validateUserPersonalData";

export default function validateUserPersonalDataMW(req: Request, _: Response, next: NextFunction) {
	// Get personal data
	const { name, email } = req.body as { name: unknown; email: unknown };

	try {
		// Validation
		validateUserPersonalData(name, email);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
