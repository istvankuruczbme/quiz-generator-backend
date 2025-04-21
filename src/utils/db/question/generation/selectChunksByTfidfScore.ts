import { TfIdf } from "natural";
import buildTfidfInstance from "../../../../services/tfidf/buildTfidfInstance";
import rankChunksByTfidfScore from "../../../../services/tfidf/rankChunksByTfidfScore";

export default function selectChunksByTfidfScore(chunks: string[], n = 1): string[] {
	// Build TFIDF instance
	const tfidf = buildTfidfInstance(chunks);

	// Rank chunks
	const rankedChunkScores = rankChunksByTfidfScore(tfidf, chunks);

	// Select first n elements
	const selectedScores = rankedChunkScores.slice(0, Math.min(n, chunks.length));

	// Return chunks
	return selectedScores.map(({ index }) => chunks[index] || "");
}
