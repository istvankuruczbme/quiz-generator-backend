import mammoth from "mammoth";
import AppError from "../../../../classes/AppError";

export default async function getDocxText(buffer: Buffer): Promise<string> {
	// Extract text
	const { value, messages } = await mammoth.extractRawText({ buffer });

	// Check messages
	if (messages.length !== 0) {
		throw new AppError({
			message: "Error extracting text from DOCX file.",
			details: messages.map((message) => message.message).join("\n"),
		});
	}

	// Return text
	return value;
}
