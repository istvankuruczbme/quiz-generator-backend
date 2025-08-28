import { Request, Response, NextFunction } from "express";
import { CategorySelect } from "../../../types/categoryTypes";
import getCategories from "../../../services/db/category/getCategories";

export default async function getCategoriesMW(_: Request, res: Response, next: NextFunction) {
	try {
		// Get categories
		const categories = await getCategories();

		// Add categories to res.locals
		(res.locals.categories as CategorySelect[]) = categories;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
