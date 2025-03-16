import { db } from "../../../drizzle/db";
import { Category } from "../../../types/categoryTypes";

export default async function getAllCategories(): Promise<Category[]> {
	const categories = await db.query.CategoryTable.findMany();
	return categories;
}
