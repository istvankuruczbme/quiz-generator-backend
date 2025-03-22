import { Request, Response, NextFunction } from "express";
import deleteUserFromAuth from "../../services/auth/deleteUserFromAuth";

export default async function deleteAuthUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user ID from res.locals
	const { userId } = res.locals as { userId: string };

	try {
		// Delete user from Supabase auth
		await deleteUserFromAuth(userId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
