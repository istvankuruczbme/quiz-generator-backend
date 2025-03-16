import { Request, Response, NextFunction } from "express";
import getUser from "../../../services/db/user/getUser";
import { User } from "../../../types/userTypes";

export default async function getUserMW(_: Request, res: Response, next: NextFunction) {
	// Get userID from res.locals
	const { userId } = res.locals as { userId: string };

	try {
		// Get user by ID
		const user = await getUser(userId);

		// Check existing user
		if (user == undefined) throw new Error("user/not-found");

		// Add user to res.locals
		(res.locals.user as User) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
