import { db } from "../../drizzle/db";
import { Category } from "../../types/categoryTypes";

export default async function getUserCategories(userId: string): Promise<Category[]> {
	const userCategories = await db.query.UserCategoryTable.findMany({
		columns: {
			userId: false,
			categoryId: false,
		},
		with: {
			category: true,
		},
		where: (userCategory, { eq }) => eq(userCategory.userId, userId),
	});

	return userCategories.map((category) => category.category);
}
