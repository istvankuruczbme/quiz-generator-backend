import { Request, Response, NextFunction } from "express";
import getAllCategories from "../../../services/db/category/getAllCategories";
import { Category } from "../../../types/categoryTypes";

export default async function getAllCategoriesMW(_: Request, res: Response, next: NextFunction) {
	try {
		// Get categories
		const categories = await getAllCategories();

		// Add categories to res.locals
		(res.locals.categories as Category[]) = categories;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
