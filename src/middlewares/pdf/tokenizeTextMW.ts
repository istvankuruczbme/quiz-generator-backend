import { Request, Response, NextFunction } from "express";
import createTokensFromText from "../../utils/tokenizer/createTokensFromText";

export default function tokenizeTextMW(_: Request, res: Response, next: NextFunction) {
	// Get text from res.locals
	const { text } = res.locals as { text: string };

	// Tokenize text
	const tokens = createTokensFromText(text);
	console.log("Tokens:", tokens.length);

	createTokensFromText(text);

	// Add tokens to res.locals
	(res.locals.tokens as Uint32Array<ArrayBufferLike>) = tokens;

	// Go to next MW
	return next();
}
