import { Request, Response, NextFunction } from "express";
import validateUserPersonalData from "../../../utils/db/user/validateUserPersonalData";

export default function validateUserPersonalDataMW(req: Request, _: Response, next: NextFunction) {
	// Get personal data
	const { name } = req.body as { name: unknown };

	try {
		// Validation
		validateUserPersonalData(name);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
