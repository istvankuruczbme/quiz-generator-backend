import { Request, Response, NextFunction } from "express";
import AppError from "../../classes/AppError";

export default function getAuthTokenMW(req: Request, res: Response, next: NextFunction) {
	// Get Authorization header
	const { authorization } = req.headers as { authorization: string };

	// Get token from header
	const token = authorization.split(" ")[1];

	try {
		// Check token
		if (!token) throw new AppError({ message: "Unauthorized request", status: 403 });

		// Add token to res.locals
		(res.locals.authToken as string) = token;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
