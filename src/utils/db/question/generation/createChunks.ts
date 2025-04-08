import createTokensFromText from "../../../tokenizer/createTokensFromText";
import splitTextToSentences from "./splitTextToSentences";

export default function createChunks(text: string, maxTokens = 500): string[] {
	// Split text into sentences
	const sentences = splitTextToSentences(text);

	// Initialize chunks array
	const chunks: string[] = [];

	// Initialize helper variables
	let currentChunk = "";
	let currentTokens = 0;

	// Loop through sentences
	for (const sentence of sentences) {
		// Calculate number of tokens of sentence
		const sentenceTokens = createTokensFromText(sentence).length;

		// Check token overflow
		if (currentTokens + sentenceTokens > maxTokens) {
			// Add the current chunk to chunks array
			chunks.push(currentChunk.trim());

			// Update current chunk and tokens to current sentence
			currentChunk = sentence;
			currentTokens = sentenceTokens;
		} else {
			// Update current chunk and tokens with the current sentence
			currentChunk += ` ${sentence}`;
			currentTokens += sentenceTokens;
		}
	}

	// Add the last chunk to chunk array
	chunks.push(currentChunk.trim());

	// Return chunks
	return chunks;
}
