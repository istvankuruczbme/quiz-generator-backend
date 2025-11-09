import { Request, Response, NextFunction } from "express";
import validateTextLanguage from "../../../../utils/db/question/validateTextLanguage";

export default function validateTextLanguageMW(_: Request, res: Response, next: NextFunction) {
	// Get text from res.locals
	const { text } = res.locals as { text: string };

	try {
		// Validate language of text
		validateTextLanguage(text);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
