import { Request, Response, NextFunction } from "express";
import validateTextLanguage from "../../../../utils/db/question/validateTextLanguage";
import { Language } from "../../../../constants/question/languages";

export default function validateTextLanguageMW(_: Request, res: Response, next: NextFunction) {
	// Get text from res.locals
	const { text } = res.locals as { text: string };

	try {
		// Validate language of text
		const language = validateTextLanguage(text);

		// Add language to res.locals
		(res.locals.language as Language) = language;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
