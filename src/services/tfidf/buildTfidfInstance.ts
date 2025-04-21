import { TfIdf } from "natural";

export default function buildTfidfInstance(chunks: string[]): TfIdf {
	// Create TFIDF instance
	const tfidf = new TfIdf();

	// Add chunks to tfidf
	chunks.forEach((chunk) => tfidf.addDocument(chunk));

	// Return instance
	return tfidf;
}
