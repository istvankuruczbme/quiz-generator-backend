import EMBEDDING_TOKEN_LIMIT from "../../assets/embeddingTokenLimit";
import createTokensFromText from "./createTokensFromText";

export default function groupChunksForEmbedding(chunks: string[]): string[][] {
	const groupedChunks: string[][] = [];
	let currentGroup: string[] = [];
	let currentTokens = 0;

	// Group elements
	for (const chunk of chunks) {
		// Get token count of text
		const textTokens = createTokensFromText(chunk).length;

		// Token limit is reached
		if (currentTokens + textTokens > EMBEDDING_TOKEN_LIMIT) {
			// Add current group to all groups
			groupedChunks.push(currentGroup);

			// Reset variables
			currentGroup = [];
			currentTokens = 0;
		}

		// Update variables
		currentGroup.push(chunk);
		currentTokens += textTokens;
	}

	// Add the last group
	if (currentGroup.length !== 0) groupedChunks.push(currentGroup);

	return groupedChunks;
}
