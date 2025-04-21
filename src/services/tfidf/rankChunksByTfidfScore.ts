import { TfIdf } from "natural";
import sumArray from "../../utils/array/sumArray";

export default function rankChunksByTfidfScore(
	tfidf: TfIdf,
	chunks: string[]
): { index: number; score: number }[] {
	// Calculate score for every chunk
	const chunkScores = chunks.map((_, i) => {
		// List terms of chunk
		const terms = tfidf.listTerms(i);

		// Get TFIDF score for every term
		const scores = terms.map((term) => term.tfidf);

		// Return total score with index
		return {
			index: i,
			score: sumArray(scores),
		};
	});

	// Sort scores descending
	const sortedScores = chunkScores.toSorted((a, b) => b.score - a.score);

	// Return sorted scores
	return sortedScores;
}
