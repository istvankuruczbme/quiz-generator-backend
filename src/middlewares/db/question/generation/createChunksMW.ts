import { Request, Response, NextFunction } from "express";
import splitTextToChunks from "../../../../utils/db/question/generation/splitTextToChunks";
import formatChunks from "../../../../utils/db/question/generation/formatChunks";
import groupChunksByTokenCount from "../../../../utils/db/question/generation/groupChunksByTokenCount";
import { Language } from "../../../../constants/question/languages";
import { MIN_CHUNK_TOKEN_COUNT } from "../../../../constants/question/minChunkTokenCount";

export default function createChunksMW(_: Request, res: Response, next: NextFunction) {
	// Get text and its language from res.locals
	const { text, language } = res.locals as { text: string; language: Language };
	const minChunkTokenCount = MIN_CHUNK_TOKEN_COUNT[language];

	// Create initial chunks
	const initialChunks = splitTextToChunks(text);

	// console.log("Initial chunks:\n");
	// for (let i = 0; i < Math.min(10, initialChunks.length); i++) {
	// 	console.log(`Chunk ${i + 1}:`, initialChunks[i], "\n\n");
	// }

	// Format chunks
	const formattedChunks = formatChunks(initialChunks);

	// console.log("Formatted chunks:\n");
	// for (let i = 0; i < Math.min(20, formattedChunks.length); i++) {
	// 	console.log(`Chunk ${i + 1}:`, formattedChunks[i], "\n\n");
	// }
	// console.log("Number of formatted chunks:", formattedChunks.length);

	// Group chunks by token count
	const finalChunks = groupChunksByTokenCount(formattedChunks, minChunkTokenCount);

	// console.log("Final chunks:\n");
	// for (let i = 0; i < Math.min(5, finalChunks.length); i++) {
	// 	console.log(`Chunk ${i + 1}:`, finalChunks[i], "\n\n");
	// }
	// console.log("Number of final chunks:", finalChunks.length);

	// return;

	// Add chunks to res.locals
	(res.locals.chunks as string[]) = finalChunks;

	// Go to next MW
	return next();
}
