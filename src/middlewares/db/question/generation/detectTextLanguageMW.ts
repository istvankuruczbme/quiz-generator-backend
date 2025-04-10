import { Request, Response, NextFunction } from "express";
import getTextLanguage from "../../../../utils/db/question/getTextLanguage";
import { Language } from "../../../../assets/languageTokenLimits";

export default function detectTextLanguageMW(_: Request, res: Response, next: NextFunction) {
	// Get text from res.locals
	const { text } = res.locals as { text: string };

	try {
		// Get language of text
		const language = getTextLanguage(text) as Language;

		// Add language to res.locals
		(res.locals.language as Language) = language;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
