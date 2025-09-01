import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { CategorySelect } from "../../../types/categoryTypes";

export default async function getCategory(id: string): Promise<CategorySelect> {
	// Get category
	const category = await db.query.CategoryTable.findFirst({
		where: (category, { eq }) => eq(category.id, id),
	});

	// Check category
	if (!category) throw new AppError({ message: "Category not found.", status: 404 });

	// Return category
	return category;
}
