import pdfParse from "pdf-parse";

export default async function getPdfText(buffer: Buffer): Promise<string> {
	// Get data using pdf-parse
	const data = await pdfParse(buffer);

	// Return text
	return data.text;
}
