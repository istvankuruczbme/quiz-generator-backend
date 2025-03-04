import { and, eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserCategoryTable } from "../../drizzle/schema/userCategory";

export default async function deleteUserCategories(
	categoryIds: string[],
	userId: string
): Promise<void> {
	categoryIds.forEach(async (categoryId) => {
		await db
			.delete(UserCategoryTable)
			.where(
				and(eq(UserCategoryTable.categoryId, categoryId), eq(UserCategoryTable.userId, userId))
			);
	});
}
