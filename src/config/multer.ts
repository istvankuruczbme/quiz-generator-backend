import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const imageUpload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
		// Check mime type
		if (!file.mimetype.startsWith("image/")) return cb(new Error("file/invalid-type"));

		cb(null, true);
	},
});

const MAX_PDF_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const pdfUpload = multer({
	storage: multer.memoryStorage(),
	fileFilter(_: Request, file: Express.Multer.File, cb: FileFilterCallback) {
		// Check if file exists
		if (file == undefined) return cb(new Error("file/missing"));

		// Check mime type
		if (file.mimetype !== "application/pdf") return cb(new Error("file/invalid-type"));

		cb(null, true);
	},
	limits: {
		fileSize: MAX_PDF_FILE_SIZE,
	},
});

export { imageUpload, pdfUpload };
