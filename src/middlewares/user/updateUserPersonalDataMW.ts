import { Request, Response, NextFunction } from "express";
import upadteUserPersonalData from "../../services/user/upadteUserPersonalData";

export default async function updateUserPersonalDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get userId and photoUrl from res.locals
	const { userId, photoUrl } = res.locals as { userId: string; photoUrl: string | null };
	// Get personal data
	const { name, email } = req.body as { name: string; email: string };

	try {
		// Update user personal data in DB
		await upadteUserPersonalData(userId, name, email, photoUrl);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
