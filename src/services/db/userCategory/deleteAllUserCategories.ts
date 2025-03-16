import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { UserCategoryTable } from "../../../drizzle/schema/userCategory";

export default async function deleteAllUserCategories(userId: string): Promise<void> {
	await db.delete(UserCategoryTable).where(eq(UserCategoryTable.userId, userId));
}
