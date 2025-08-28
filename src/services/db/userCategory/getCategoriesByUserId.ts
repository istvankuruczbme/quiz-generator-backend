import { db } from "../../../drizzle/db";
import { CategorySelect } from "../../../types/categoryTypes";

export default async function getCategoriesByUserId(userId: string): Promise<CategorySelect[]> {
	const categories = await db.query.UserCategoryTable.findMany({
		columns: {
			userId: false,
			categoryId: false,
		},
		with: {
			category: true,
		},
		where: (userCategory, { eq }) => eq(userCategory.userId, userId),
	});

	return categories.map((category) => category.category);
}
