import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const imageUpload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
		// Check mime type
		if (!file.mimetype.startsWith("image/")) return cb(new Error("file/not-an-image"));

		cb(null, true);
	},
});

const MAX_PDF_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const quizFileUpload = multer({
	storage: multer.memoryStorage(),
	fileFilter(_: Request, file: Express.Multer.File, cb: FileFilterCallback) {
		// Check if file exists
		if (file == undefined) return cb(new Error("file/missing"));

		// Check files without valid mime type
		if (file.mimetype === "application/octet-stream") {
			// Get extension of file
			const extension = path.extname(file.originalname).toLocaleLowerCase();

			// Update file mime type
			switch (extension) {
				case ".md":
					file.mimetype = "text/markdown";
					break;
				default:
					return cb(new Error("file/not-a-text-file"));
			}
		}

		// Allowed mime types
		const allowedMimeTypes = [
			"application/pdf", // PDF
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
			"text/markdown", // MD
			"text/plain", // TXT
		];

		// Check mime type
		if (!allowedMimeTypes.includes(file.mimetype)) return cb(new Error("file/not-a-text-file"));

		cb(null, true);
	},
	limits: {
		fileSize: MAX_PDF_FILE_SIZE,
	},
});

export { imageUpload, quizFileUpload };
