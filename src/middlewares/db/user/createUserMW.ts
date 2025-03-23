import { Request, Response, NextFunction } from "express";
import createUser from "../../../services/db/user/createUser";
import { User } from "../../../types/userTypes";

export default async function createUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user data from res.locals
	const { id, name, email, photoUrl, customerId } = res.locals as {
		id: string;
		name: string;
		email: string;
		photoUrl: string;
		customerId: string;
	};

	try {
		// Create user
		const user = await createUser(id, customerId, name, email, photoUrl);

		// Add user to res.locals
		(res.locals.user as User) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
