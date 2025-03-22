import { Request, Response, NextFunction } from "express";
import updateUserEmail from "../../../services/db/user/updateUserEmail";
import { User } from "../../../types/userTypes";

export default async function updateUserEmailMW(req: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };
	// Get email from req.body
	const { email } = req.body as { email: string };

	try {
		// Update user email in DB
		await updateUserEmail(user.id, email);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
