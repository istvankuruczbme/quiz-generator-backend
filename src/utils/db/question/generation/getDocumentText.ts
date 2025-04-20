import getDocxText from "./getDocxText";
import getMarkdownText from "./getMarkdownText";
import getPdfText from "./getPdfText";
import getTxtText from "./getTxtText";

export default async function getDocumentText(file: Express.Multer.File): Promise<string> {
	switch (file.mimetype) {
		case "application/pdf":
			return await getPdfText(file.buffer);

		case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			return await getDocxText(file.buffer);

		case "text/markdown":
			return getMarkdownText(file.buffer);

		case "text/plain":
			return getTxtText(file.buffer);

		default:
			throw new Error("quiz/generation/file-invalid-type");
	}
}
