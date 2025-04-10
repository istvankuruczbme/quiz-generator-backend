import { Request, Response, NextFunction } from "express";
import createChunks from "../../../../utils/db/question/generation/createChunks";
import { TokenLimit } from "../../../../assets/languageTokenLimits";

export default function createChunksMW(_: Request, res: Response, next: NextFunction) {
	// Get text and token limit from res.locals
	const { text, tokenLimit } = res.locals as { text: string; tokenLimit: TokenLimit };

	// Create chunks
	const chunks = createChunks(text, tokenLimit);

	// Add chunks to res.locals
	(res.locals.chunks as string[]) = chunks;

	// Go to next MW
	return next();
}
