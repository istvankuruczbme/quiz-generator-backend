import { Request, Response, NextFunction } from "express";
import getUserCategories from "../../services/userCategory/getUserCategories";
import { Category } from "../../types/categoryTypes";

export default async function getUserCategoriesMW(_: Request, res: Response, next: NextFunction) {
	// Get userId from res.locals
	const { userId } = res.locals as { userId: string };

	try {
		// Get user category IDs
		const categories = await getUserCategories(userId);

		// Add category IDs to res.locals
		(res.locals.userCategories as Category[]) = categories;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
