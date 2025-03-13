import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const imageUpload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
		// Check file type
		if (!file.mimetype.startsWith("image/")) return cb(new Error("file/invalid-type"));

		cb(null, true);
	},
});

export { imageUpload };
