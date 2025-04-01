import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import updateUser from "../../../services/db/user/updateUser";

export default async function updateUserPersonalDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and photoUrl from res.locals
	const { user, photoUrl } = res.locals as { user: User; photoUrl: string | null };
	// Get personal data
	const { name } = req.body as { name: string };

	try {
		// Update user personal data in DB
		await updateUser(user.id, { name, photoUrl });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
