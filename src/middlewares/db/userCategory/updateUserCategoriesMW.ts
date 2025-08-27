import { Request, Response, NextFunction } from "express";
import { Category } from "../../../types/categoryTypes";
import getDifferentArrayElements from "../../../utils/array/getDifferentArrayElements";
import addUserCategories from "../../../services/db/userCategory/addUserCategories";
import deleteUserCategories from "../../../services/db/userCategory/deleteUserCategories";
import { UserSelect } from "../../../types/userTypes";

export default async function updateUserCategoriesMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get category IDs from request body
	const { categoryIds } = req.body as { categoryIds: string[] };

	// Get user and user categories from res.locals
	const { user, userCategories } = res.locals as { user: UserSelect; userCategories: Category[] };
	const userCategoryIds = userCategories.map((category) => category.id);

	try {
		// Find category IDs to be added and deleted
		const categoryIdsToAdd = getDifferentArrayElements(categoryIds, userCategoryIds);
		const categoryIdsToDelete = getDifferentArrayElements(userCategoryIds, categoryIds);

		// Update the categories of user
		await addUserCategories(categoryIdsToAdd, user.id);
		await deleteUserCategories(categoryIdsToDelete, user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
