import { Request, Response, NextFunction } from "express";
import deleteUserFromAuth from "../../services/auth/deleteUserFromAuth";
import { UserSelect } from "../../types/userTypes";

export default async function deleteAuthUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	try {
		// Delete user from Supabase auth
		await deleteUserFromAuth(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
