import createTokensFromText from "../../../tokenizer/createTokensFromText";

const MAX_TOKENS = 168_000 - 16_000; // 168k context window - max output

export default function groupChunksByTokenCount(chunks: string[]): string[] {
	// Initialize groups array
	const groups: string[] = [];

	// Loop through chunks
	for (const chunk of chunks) {
		// Get number of tokens
		const chunkTokenCount = createTokensFromText(chunk).length;

		// Token count exceeds max tokens
		if (chunkTokenCount > MAX_TOKENS) {
			// Calculate max chars per sub-chunk
			const maxChars = Math.floor((MAX_TOKENS / chunkTokenCount) * chunk.length * 0.9); // 0.9 safety factor

			// Add sub-chunks to groups array
			let charCount = 0;
			while (charCount < chunk.length) {
				const subChunk = chunk.slice(charCount, charCount + maxChars);
				groups.push(subChunk.trim());
				charCount += maxChars;
			}

			// Go to next chunk
			continue;
		}

		// Add chunk to groups
		groups.push(chunk);
	}

	// Return groups
	return groups;
}
