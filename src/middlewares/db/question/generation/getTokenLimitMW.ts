import { Request, Response, NextFunction } from "express";
import languageTokenLimits, { Language, TokenLimit } from "../../../../assets/languageTokenLimits";

export default function getTokenLimitMW(_: Request, res: Response, next: NextFunction) {
	// Get language from res.locals
	const { language } = res.locals as { language: Language };

	// Get token limit based on language
	const tokenLimit = languageTokenLimits[language];

	// Add token limit to res.locals
	(res.locals.tokenLimit as TokenLimit) = tokenLimit;

	// Go to next MW
	return next();
}
