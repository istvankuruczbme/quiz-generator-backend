import { Request, Response, NextFunction } from "express";
import validateCategoriesData from "../../../utils/db/category/validateCategoriesData";

export default function validateCategoriesDataMW(req: Request, _: Response, next: NextFunction) {
	// Get category IDs from request body
	const { categoryIds } = req.body as { categoryIds: unknown };

	try {
		// Validation
		validateCategoriesData(categoryIds);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
