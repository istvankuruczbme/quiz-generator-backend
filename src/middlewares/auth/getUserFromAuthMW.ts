import { Request, Response, NextFunction } from "express";
import getUserFromAuth from "../../services/auth/getUserFromAuth";
import { User } from "@supabase/supabase-js";

export default async function getUserFromAuthMW(_: Request, res: Response, next: NextFunction) {
	// Get auth token from res.locals
	const { authToken } = res.locals as { authToken: string };

	try {
		// Get user from auth with Supabase
		const user = await getUserFromAuth(authToken);

		// Add user to res.locals
		(res.locals.authUser as User) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(new Error("auth/unauthorized"));
	}
}
