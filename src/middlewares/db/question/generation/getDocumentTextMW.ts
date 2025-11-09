import { Request, Response, NextFunction } from "express";
import getDocumentText from "../../../../utils/db/question/generation/getDocumentText";

export default async function getDocumentTextMW(req: Request, res: Response, next: NextFunction) {
	// Get file from req.body
	const { file } = req as { file: Express.Multer.File };

	try {
		// Extract text from document
		const text = await getDocumentText(file);

		// console.log("Raw text:\n", JSON.stringify(text.slice(0, 1500)));

		// Add text to res.locals
		(res.locals.text as string) = text;

		// Return text
		return next();
	} catch (err) {
		return next(err);
	}
}
