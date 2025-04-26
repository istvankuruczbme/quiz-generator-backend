import createEmbeddings from "../../../../services/openai/createEmbeddings";
import calculateVectorNorm from "../../../math/calculateVectorNorm";
import groupChunksForEmbedding from "../../../tokenizer/groupChunksForEmbedding";

export default async function selectChunksByEmbedding(chunks: string[], n = 1) {
	// Group chunks
	const chunksArray = groupChunksForEmbedding(chunks);

	// Create embedding for every chunk
	const embeddings = await Promise.all(
		chunksArray.map(async (chunks) => (await createEmbeddings(chunks)).flat()).flat()
	);

	// Calculate norm for every embedding vector
	const norms = embeddings.map((embedding, i) => ({
		index: i,
		norm: calculateVectorNorm(embedding),
	}));

	// Sort norms
	const sortedNorms = norms.toSorted((a, b) => b.norm - a.norm);

	// Select first n norms
	const selectedNorms = sortedNorms.slice(0, Math.min(n, chunks.length));

	// Return chunks
	return selectedNorms.map(({ index }) => chunks[index] || "");
}
