import { Request, Response, NextFunction } from "express";
import updateUserEmail from "../../../services/db/user/updateUserEmail";

export default async function updateUserEmailMW(req: Request, res: Response, next: NextFunction) {
	// Get user ID
	const { userId } = res.locals as { userId: string };
	// Get email
	const { email } = req.body as { email: string };

	try {
		// Update user email in DB
		await updateUserEmail(userId, email);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
