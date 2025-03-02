import { Request, Response, NextFunction } from "express";
import validateUserData from "../../services/user/validateUserData";

export default function validateUserDataMW(req: Request, res: Response, next: NextFunction) {
	// Get user data from request body
	const { id, name, email } = req.body as { id: unknown; name: unknown; email: unknown };

	try {
		validateUserData(id, name, email);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
