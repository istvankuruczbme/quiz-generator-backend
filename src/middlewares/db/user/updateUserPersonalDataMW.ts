import { Request, Response, NextFunction } from "express";
import upadteUserPersonalData from "../../../services/db/user/upadteUserPersonalData";
import { User } from "../../../types/userTypes";

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
		await upadteUserPersonalData(user.id, name, photoUrl);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
