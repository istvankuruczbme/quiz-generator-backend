import { Request, Response, NextFunction } from "express";
import { CategorySelect } from "../../../types/categoryTypes";
import getDifferentArrayElements from "../../../utils/array/getDifferentArrayElements";
import addUserCategories from "../../../services/db/userCategory/addUserCategories";
import deleteUserCategories from "../../../services/db/userCategory/deleteUserCategories";
import { UserSelect } from "../../../types/userTypes";
import { UpdateUserCategoryData } from "../../../utils/db/userCategory/validation/schemas/updateUserCategoriesSchema";

export default async function updateUserCategoriesMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user, categories, user categories and user categories data
	const { user, categories, userCategories, userCategoriesData } = res.locals as {
		user: UserSelect;
		categories: CategorySelect[];
		userCategories: CategorySelect[];
		userCategoriesData: UpdateUserCategoryData;
	};
	const userCategoryIds = userCategories.map((category) => category.id);

	try {
		// Find category IDs to be added and deleted
		const categoryIdsToAdd = getDifferentArrayElements(
			userCategoriesData.categoryIds,
			userCategoryIds
		);
		const categoryIdsToDelete = getDifferentArrayElements(
			userCategoryIds,
			userCategoriesData.categoryIds
		);

		// Update the categories of user
		await addUserCategories(categoryIdsToAdd, user.id);
		await deleteUserCategories(categoryIdsToDelete, user.id);

		// Update user categories in res.locals
		const newUserCategoryIds = [
			...userCategories.map((category) => category.id),
			...categoryIdsToAdd,
		].filter((id) => !categoryIdsToDelete.includes(id));
		const newUserCategories = categories.filter((category) =>
			newUserCategoryIds.includes(category.id)
		);
		(res.locals.userCategories as CategorySelect[]) = newUserCategories;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
