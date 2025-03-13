import { Request, Response, NextFunction } from "express";
import deleteUser from "../../services/user/deleteUser";

export default async function deleteUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user ID from res.locals
	const { userId } = res.locals as { userId: string };

	try {
		// Delete user
		await deleteUser(userId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
