import { db } from "../../../drizzle/db";
import { UserCategoryTable } from "../../../drizzle/schema/userCategory";

export default async function addUserCategories(
	categoryIds: string[],
	userId: string
): Promise<void> {
	// Check if there are category IDs
	if (categoryIds.length === 0) return;

	// Create record values
	const userCategoryValues = categoryIds.map((categoryId) => ({ categoryId, userId }));

	// Insert values
	await db.insert(UserCategoryTable).values(userCategoryValues);
}
