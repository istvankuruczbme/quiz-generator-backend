import { Request, Response, NextFunction } from "express";
import getUserCategories from "../../../services/db/userCategory/getUserCategories";
import { Category } from "../../../types/categoryTypes";
import { UserSelect } from "../../../types/userTypes";

export default async function getUserCategoriesMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get user category IDs
		const categories = await getUserCategories(user.id);

		// Add category IDs to res.locals
		(res.locals.userCategories as Category[]) = categories;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
