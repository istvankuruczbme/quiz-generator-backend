import { Request, Response, NextFunction } from "express";
import validateBearerAuthorizationHeader from "../../utils/validation/validateBearerAuthorizationHeader";

export default async function validateAuthorizationHeaderMW(
	req: Request,
	_: Response,
	next: NextFunction
) {
	// Get Authorization header
	const { authorization } = req.headers;

	try {
		// Validation
		validateBearerAuthorizationHeader(authorization);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
