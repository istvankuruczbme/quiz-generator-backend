import { Request, Response, NextFunction } from "express";
import validateUserData from "../../services/user/validateUserData";

export default function validateUserDataMW(req: Request, _: Response, next: NextFunction) {
	// Get user data from request body
	const { id, name, email, photoUrl } = req.body as {
		id: unknown;
		name: unknown;
		email: unknown;
		photoUrl: unknown;
	};

	try {
		// Validation
		validateUserData(id, name, email, photoUrl);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
