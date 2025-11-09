import removeMd from "remove-markdown";

export default function getMarkdownText(buffer: Buffer): string {
	// Get text from file
	const rawText = buffer.toString("utf-8");

	// Clean text from syntax
	const text = removeMd(rawText, {
		stripListLeaders: false,
		useImgAltText: true,
	});

	// Return clean text
	return text;
}
