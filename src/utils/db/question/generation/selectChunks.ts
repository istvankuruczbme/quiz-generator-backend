import { QuestionGenerationStrategy } from "../../../../assets/questionGenerationStrategies";
import pickRandomNElements from "../../../array/pickRandomNElements";

export default function selectChunks(
	chunks: string[],
	n: number,
	strategy: QuestionGenerationStrategy
): string[] {
	// Check n
	if (isNaN(n) || !Number.isInteger(n) || n < 1) return [];

	switch (strategy) {
		case "RANDOM":
			return pickRandomNElements(chunks, n);
	}
}
