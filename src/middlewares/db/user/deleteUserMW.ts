import { Request, Response, NextFunction } from "express";
import deleteUser from "../../../services/db/user/deleteUser";
import { User } from "../../../types/userTypes";

export default async function deleteUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	try {
		// Delete user
		await deleteUser(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
