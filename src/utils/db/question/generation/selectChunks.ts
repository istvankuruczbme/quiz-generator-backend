import { QuestionGenerationStrategy } from "../../../../assets/questionGenerationStrategies";
import selectRandomElements from "../../../array/selectRandomElements";
import selectChunksByEmbedding from "./selectChunksByEmbedding";
import selectChunksByTfidfScore from "./selectChunksByTfidfScore";

export default async function selectChunks(
	chunks: string[],
	n: number,
	strategy: QuestionGenerationStrategy
): Promise<string[]> {
	// Check n
	if (isNaN(n) || !Number.isInteger(n) || n < 1) return [];

	switch (strategy) {
		case "RANDOM":
			return selectRandomElements(chunks, n);
		case "TFIDF":
			return selectChunksByTfidfScore(chunks, n);
		case "EMBEDDING":
			return await selectChunksByEmbedding(chunks, n);
	}
}
