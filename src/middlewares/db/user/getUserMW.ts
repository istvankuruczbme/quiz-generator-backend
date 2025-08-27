import { Request, Response, NextFunction } from "express";
import getUser from "../../../services/db/user/getUser";
import { UserSelect } from "../../../types/userTypes";
import { User as AuthUser } from "@supabase/supabase-js";

export default async function getUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user from auth
	const { authUser } = res.locals as { authUser: AuthUser };

	try {
		// Get user by ID
		const user = await getUser(authUser.id);

		// Add user to res.locals
		(res.locals.user as UserSelect) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
