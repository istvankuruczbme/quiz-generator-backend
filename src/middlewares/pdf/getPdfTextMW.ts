import { Request, Response, NextFunction } from "express";
import getTextFromPdf from "../../utils/pdf/getTextFromPdf";

export default async function getPdfTextMW(req: Request, res: Response, next: NextFunction) {
	// Get file from req.body
	const { file } = req as { file: Express.Multer.File };

	try {
		// Get text from PDF
		const text = await getTextFromPdf(file.buffer);

		// Add text to res.locals
		(res.locals.text as string) = text;

		// Return text
		return next();
	} catch (err) {
		return next(err);
	}
}
