import { Request, Response, NextFunction } from "express";
import deleteAllUserCategories from "../../../services/db/userCategory/deleteAllUserCategories";
import { User } from "../../../types/userTypes";

export default async function deleteUserCategoriesMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	try {
		// Delete user catgeories
		await deleteAllUserCategories(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
