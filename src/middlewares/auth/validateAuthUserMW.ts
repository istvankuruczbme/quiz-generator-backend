import { User } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";

export default function validateAuthUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user from auth and user ID from res.locals
	const { userId, authUser } = res.locals as { userId: string; authUser: User };

	try {
		// Check same user ID
		if (userId !== authUser.id) throw new Error("user/unauthorized");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
