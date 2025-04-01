import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import updateUser from "../../../services/db/user/updateUser";

export default async function updateUserEmailMW(req: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };
	// Get email from req.body
	const { email } = req.body as { email: string };

	try {
		// Update user email in DB
		await updateUser(user.id, { email });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
