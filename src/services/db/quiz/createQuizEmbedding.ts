import { openai } from "../../../config/openai";

export default async function createQuizEmbedding(
	title: string,
	description: string
): Promise<number[]> {
	// Create embedding
	const { data } = await openai.embeddings.create({
		model: "text-embedding-3-small",
		input: `Title: ${title}\nDescription: ${description}`,
		encoding_format: "float",
	});

	// Get embedding values
	const values = data[0]?.embedding;

	// Check if values exist
	if (values == undefined) throw new Error("quiz/embedding-values-missing");

	// Return values
	return values;
}
