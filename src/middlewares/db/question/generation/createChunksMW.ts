import { Request, Response, NextFunction } from "express";
import splitTextToChunks from "../../../../utils/db/question/generation/splitTextToChunks";
import formatChunks from "../../../../utils/db/question/generation/formatChunks";
import groupChunksByTokenCount from "../../../../utils/db/question/generation/groupChunksByTokenCount";

export default function createChunksMW(_: Request, res: Response, next: NextFunction) {
	// Get text and token limit from res.locals
	const { text } = res.locals as { text: string };

	// Create initial chunks
	const initialChunks = splitTextToChunks(text);

	// console.log("Initial chunks:\n");
	// for (let i = 0; i < Math.min(10, initialChunks.length); i++) {
	// 	console.log(`Chunk ${i + 1}:`, initialChunks[i], "\n\n");
	// }

	// Format chunks
	const formattedChunks = formatChunks(initialChunks);

	// console.log("Formatted chunks:\n");
	// for (let i = 0; i < Math.min(5, formattedChunks.length); i++) {
	// 	console.log(`Chunk ${i + 1}:`, formattedChunks[i], "\n\n");
	// }

	// Group chunks by token count
	const finalChunks = groupChunksByTokenCount(formattedChunks);

	// Add chunks to res.locals
	(res.locals.chunks as string[]) = finalChunks;

	// Go to next MW
	return next();
}
