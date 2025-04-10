import mammoth from "mammoth";

export default async function getDocxText(buffer: Buffer): Promise<string> {
	// Extract text
	const { value, messages } = await mammoth.extractRawText({ buffer });

	// Check messages
	if (messages.length !== 0) throw messages;

	// Return text
	return value;
}
