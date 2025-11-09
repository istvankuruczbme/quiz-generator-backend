import { Chunk } from "../../../../types/questionTypes";

const LIST_MARKERS_REGEX = /^(\d+\.|[-–*•])/;
const STARTS_WITH_UPPERCASE_REGEX = /^[A-Z(]/;
const ENDS_WITH_PUNCTUATION_REGEX = /[.!?:"”)]$/;

function startsWithListMarker(string: string): boolean {
	return LIST_MARKERS_REGEX.test(string);
}
function hasChunkLine(chunk: Chunk): boolean {
	return chunk.length > 0;
}
function isLastChunkLineList(chunk: Chunk): boolean {
	const lastLine = chunk.at(-1);
	return lastLine ? lastLine.type.startsWith("list") : false;
}
function endsWithPunctuation(string: string): boolean {
	return ENDS_WITH_PUNCTUATION_REGEX.test(string);
}
function startsWithUppercase(string: string): boolean {
	return STARTS_WITH_UPPERCASE_REGEX.test(string);
}

export default function splitTextToChunks(text: string): Chunk[] {
	// Break text into lines
	const lines = text
		.split(/\r?\n/)
		.map((t) => t.trim())
		.filter(Boolean); // filter empty lines

	// Group lines into chunks
	const chunks: Chunk[] = [];
	let currentChunk: Chunk = [];

	for (let i = 0; i < lines.length; i++) {
		// Get current line and previous line of chunk
		const currentLine = lines[i]!;

		// Check if line is a list item
		if (startsWithListMarker(currentLine)) {
			// There is a previous line in the current chunk
			if (hasChunkLine(currentChunk)) {
				// Previous line of current chunk is a list item
				if (isLastChunkLineList(currentChunk)) {
					currentChunk.push({ type: "list", content: currentLine });
				} else {
					// Previous line of current chunk is normal
					currentChunk.push({ type: "list-first", content: currentLine });
				}
			} else {
				// No previous line in current chunk
				currentChunk.push({ type: "list-first", content: currentLine });
			}

			// Go to next line
			continue;
		}

		// Current line ends with punctuation
		if (endsWithPunctuation(currentLine)) {
			// There is a previous line in the current chunk
			if (hasChunkLine(currentChunk)) {
				// Previous line of current chunk is a list item
				if (isLastChunkLineList(currentChunk)) {
					// Current line starts with uppercase letter
					if (startsWithUppercase(currentLine)) {
						chunks.push(currentChunk);
						currentChunk = [{ type: "normal-first", content: currentLine }];
					} else {
						// Continue list
						currentChunk.push({ type: "list", content: currentLine });
					}
				} else {
					// Previous line of current chunk is normal
					if (startsWithUppercase(currentLine)) {
						// Current line starts with uppercase letter
						chunks.push(currentChunk);
						currentChunk = [{ type: "normal-first", content: currentLine }];
					} else {
						currentChunk.push({ type: "normal", content: currentLine });
					}
				}
			} else {
				// No previous line in current chunk
				currentChunk.push({ type: "normal-first", content: currentLine });
				chunks.push(currentChunk);
				currentChunk = [];
			}

			// Go to next line
			continue;
		}

		// There is a previous line in the current chunk
		if (hasChunkLine(currentChunk)) {
			// Previous line of current chunk is a list item
			if (isLastChunkLineList(currentChunk)) {
				// Current line starts with uppercase letter
				if (startsWithUppercase(currentLine)) {
					chunks.push(currentChunk);
					currentChunk = [{ type: "normal-first", content: currentLine }];
				} else {
					currentChunk.push({ type: "list", content: currentLine });
				}
			} else {
				// Previous line of current chunk is normal
				if (startsWithUppercase(currentLine)) {
					// Current line starts with uppercase letter
					chunks.push(currentChunk);
					currentChunk = [{ type: "normal-first", content: currentLine }];
				} else {
					currentChunk.push({ type: "normal", content: currentLine });
				}
			}
		} else {
			// No previous line in current chunk
			currentChunk.push({ type: "normal-first", content: currentLine });
		}
	}
	if (currentChunk.length > 0) chunks.push(currentChunk);

	// Return chunks
	return chunks;
}
