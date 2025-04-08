import { Request, Response, NextFunction } from "express";
import createChunks from "../../../../utils/db/question/generation/createChunks";

export default function createChunksMW(_: Request, res: Response, next: NextFunction) {
	// Get text from res.locals
	const { text } = res.locals as { text: string };

	// Create chunks
	const chunks = createChunks(text);

	// Add chunks to res.locals
	(res.locals.chunks as string[]) = chunks;

	// Go to next MW
	return next();
}
