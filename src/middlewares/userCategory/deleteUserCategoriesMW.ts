import { Request, Response, NextFunction } from "express";
import deleteAllUserCategories from "../../services/userCategory/deleteAllUserCategories";

export default async function deleteUserCategoriesMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user ID from res.locals
	const { userId } = res.locals as { userId: string };

	try {
		// Delete user catgeories
		await deleteAllUserCategories(userId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
