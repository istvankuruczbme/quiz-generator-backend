import AppError from "../../../classes/AppError";
import { openai } from "../../../config/openai";
import { CategorySelect } from "../../../types/categoryTypes";

export default async function createUserCategoriesEmbedding(
	categories: CategorySelect[]
): Promise<number[]> {
	// Get category names
	const categoryNames = categories.map((category) => category.name).join(" ");

	// Create embedding
	const { data } = await openai.embeddings.create({
		model: "text-embedding-3-small",
		input: categoryNames,
		encoding_format: "float",
	});

	// Get embedding values
	const values = data[0]?.embedding;

	// Check values
	if (!values) throw new AppError({ message: "No embedding values generated." });

	// Return values
	return values;
}
