import createEmbeddings from "../../../../services/embeddingServer/createEmbeddings";
import calculateVectorNorm from "../../../math/calculateVectorNorm";

export default async function selectChunksByEmbedding(chunks: string[], n = 1) {
	// Create embedding for every chunk
	const embeddings = await createEmbeddings(chunks);

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
