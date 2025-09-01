import AppError from "../../../classes/AppError";
import { openai } from "../../../config/openai";

export default async function createQuizEmbedding(quizData: {
	title: string;
	description: string;
}): Promise<number[]> {
	// Get quiz properties
	const { title, description } = quizData;

	// Create embedding
	const { data } = await openai.embeddings.create({
		model: "text-embedding-3-small",
		input: `Title: ${title}\nDescription: ${description}`,
		encoding_format: "float",
	});

	// Get embedding values
	const values = data[0]?.embedding;

	// Check values
	if (!values) throw new AppError({ message: "No embedding values generated." });

	// Return values
	return values;
}
