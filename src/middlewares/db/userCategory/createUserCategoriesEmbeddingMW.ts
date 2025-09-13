import { Request, Response, NextFunction } from "express";
import { CategorySelect } from "../../../types/categoryTypes";
import createUserCategoriesEmbedding from "../../../services/db/userCategory/createUserCategoriesEmbedding";
import updateUser from "../../../services/db/user/updateUser";
import { UserSelect } from "../../../types/userTypes";

export default async function createUserCategoriesEmbeddingMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and user categories
	const { user, userCategories } = res.locals as {
		user: UserSelect;
		userCategories: CategorySelect[];
	};

	try {
		// Create embedding
		const embedding = await createUserCategoriesEmbedding(userCategories);

		// Update user
		await updateUser(user.id, { embedding });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
