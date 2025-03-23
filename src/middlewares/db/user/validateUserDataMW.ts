import { Request, Response, NextFunction } from "express";
import validateUserData from "../../../services/db/user/validateUserData";
import { User } from "@supabase/supabase-js";

export default function validateUserDataMW(_: Request, res: Response, next: NextFunction) {
	// Get authenticated user from res.locals
	const { authUser } = res.locals as { authUser: User };

	// Get data of user that has to be validated
	const { id, email, user_metadata } = authUser;

	try {
		// Validation
		validateUserData(user_metadata.full_name, email, user_metadata.avatar_url);

		// Add data to res.locals
		(res.locals.id as string) = id;
		(res.locals.name as string) = user_metadata.full_name as string;
		(res.locals.email as string) = email as string;
		(res.locals.photoUrl as string) = user_metadata.avatar_url as string;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
