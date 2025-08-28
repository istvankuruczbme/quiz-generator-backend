import { Request, Response, NextFunction } from "express";
import getCategoriesByUserId from "../../../services/db/userCategory/getCategoriesByUserId";
import { CategorySelect } from "../../../types/categoryTypes";
import { UserSelect } from "../../../types/userTypes";

export default async function getUserCategoriesMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get user category IDs
		const categories = await getCategoriesByUserId(user.id);

		// Add categories to res.locals
		(res.locals.userCategories as CategorySelect[]) = categories;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
