import { Request, Response } from "express";
import { CategorySelect } from "../../../types/categoryTypes";

export default function returnUserCategoriesMW(_: Request, res: Response) {
	// Get user from res.locals
	const { userCategories } = res.locals as { userCategories: CategorySelect[] };

	// Return user
	res.status(200).json(userCategories);
}
