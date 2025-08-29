import { db } from "../../../drizzle/db";
import { CategorySelect } from "../../../types/categoryTypes";

export default async function getCategories(): Promise<CategorySelect[]> {
	const categories = await db.query.CategoryTable.findMany();
	return categories;
}
