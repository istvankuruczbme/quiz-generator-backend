import { Request, Response, NextFunction } from "express";
import getUserById from "../../services/user/getUserById";

export default async function checkExistingUserMW(_: Request, res: Response, next: NextFunction) {
	// Get userId from res.locals
	const { userId } = res.locals as { userId: string };

	try {
		// Get user by ID
		const user = await getUserById(userId);

		// Check existing user
		if (user == undefined) throw new Error("user/not-found");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
