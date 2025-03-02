import { Request, Response } from "express";
import { Category } from "../../types/categoryTypes";

export default function returnCategoriesMW(_: Request, res: Response) {
	// Get catehógories from res.locals
	const { categories } = res.locals as { categories: Category[] };

	// Return categories
	res.status(200).json(categories);
}
