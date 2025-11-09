import mammoth from "mammoth";

export default async function getDocxText(buffer: Buffer): Promise<string> {
	// Extract text
	const { value, messages } = await mammoth.extractRawText({ buffer });

	// Check messages
	if (messages.length !== 0) {
		console.warn("DOCX extraction warnings:\n", messages.map((m) => m.message).join("\n"));
	}

	// Return text
	return value;
}
