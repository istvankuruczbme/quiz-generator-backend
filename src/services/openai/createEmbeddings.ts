import { openai } from "../../config/openai";

export default async function createEmbeddings(textArray: string[]): Promise<number[][]> {
	// Create embeddings
	const response = await openai.embeddings.create({
		model: "text-embedding-3-small",
		input: textArray,
		encoding_format: "float",
	});

	// Return embedding values
	return response.data.map((item) => item.embedding);
}
