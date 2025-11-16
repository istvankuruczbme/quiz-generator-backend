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
function isPreviousLineList(chunk: Chunk): boolean {
	const lastLine = chunk.at(-1);
	return lastLine ? lastLine.type === "list" : false;
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
		// Get current line and its type
		const currentLine = lines[i]!;

		// list (current line)
		if (startsWithListMarker(currentLine)) {
			currentChunk.push({ type: "list", content: currentLine });
		}
		// normal (current line)
		else {
			// Current line ends with punctuation
			if (endsWithPunctuation(currentLine)) {
				// Previous line in current chunk exists
				if (hasChunkLine(currentChunk)) {
					// list (previous line)
					if (isPreviousLineList(currentChunk)) {
						// Current line starts with uppercase letter
						if (startsWithUppercase(currentLine)) {
							chunks.push(currentChunk);
							currentChunk = [{ type: "normal", content: currentLine }];
						}
						// Continue list
						else {
							currentChunk.push({ type: "list", content: currentLine });
						}
					}
					// normal (previous line)
					else {
						// Current line starts with uppercase letter
						if (startsWithUppercase(currentLine)) {
							chunks.push(currentChunk);
							currentChunk = [{ type: "normal", content: currentLine }];
						}
						// Continue normal text
						else {
							currentChunk.push({ type: "normal", content: currentLine });
						}
					}
				}
				// No previous line in current chunk
				else {
					currentChunk.push({ type: "normal", content: currentLine });
					chunks.push(currentChunk);
					currentChunk = [];
				}
			}
			// Current line does not end with punctuation
			else {
				// Previous line in current chunk exists
				if (hasChunkLine(currentChunk)) {
					// list (previous line)
					if (isPreviousLineList(currentChunk)) {
						// Current line starts with uppercase letter
						if (startsWithUppercase(currentLine)) {
							chunks.push(currentChunk);
							currentChunk = [{ type: "normal", content: currentLine }];
						}
						// Continue list
						else {
							currentChunk.push({ type: "list", content: currentLine });
						}
					}
					// normal (previous line)
					else {
						// Previous line of current chunk is normal
						if (startsWithUppercase(currentLine)) {
							// Current line starts with uppercase letter
							chunks.push(currentChunk);
							currentChunk = [{ type: "normal", content: currentLine }];
						}
						// Continue normal text
						else {
							currentChunk.push({ type: "normal", content: currentLine });
						}
					}
				}
				// No previous line in current chunk
				else {
					currentChunk.push({ type: "normal", content: currentLine });
				}
			}
		}
	}
	if (currentChunk.length > 0) chunks.push(currentChunk);

	// Return chunks
	return chunks;
}
