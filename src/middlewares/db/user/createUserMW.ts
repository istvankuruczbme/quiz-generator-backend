import { Request, Response, NextFunction } from "express";
import createUser from "../../../services/db/user/createUser";
import { User } from "../../../types/userTypes";

export default async function createUserMW(req: Request, res: Response, next: NextFunction) {
	// Get user data
	const { id, name, email, photoUrl } = req.body as {
		id: string;
		name: string;
		email: string;
		photoUrl: string | null;
	};
	const { customerId } = res.locals as { customerId: string };

	try {
		// Create user
		const user = await createUser(id, customerId, name, email, photoUrl);

		// Check if creation was successful
		if (user == undefined) throw new Error("user/not-created");

		// Add user to res.locals
		(res.locals.user as User) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
