import getPdfText from "./getPdfText";

export default async function getDocumentText(file: Express.Multer.File): Promise<string> {
	switch (file.mimetype) {
		case "application/pdf":
			// Get text from PDF
			return await getPdfText(file.buffer);

		default:
			throw new Error("quiz/questions/invalid-file-type");
	}
}
