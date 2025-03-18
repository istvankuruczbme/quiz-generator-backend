import { Request, Response, NextFunction } from "express";
import getUserFromAuth from "../../services/auth/getUserFromAuth";

export default async function checkExistingUserFromAuthMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get auth token from res.locals
	const { authToken } = res.locals as { authToken: string };

	try {
		// Get user from auth with Supabase
		const user = await getUserFromAuth(authToken);

		// Check user
		if (user == null) throw new Error("auth/invalid-token");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
