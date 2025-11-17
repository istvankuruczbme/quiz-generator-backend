import { Request, Response, NextFunction } from "express";
import { QuestionGenerationStrategy } from "../../../../assets/questionGeneration/questionGenerationStrategies";
import selectChunks from "../../../../utils/db/question/generation/selectChunks";

export default async function selectChunksMW(req: Request, res: Response, next: NextFunction) {
	// Get chunks and question count from res.locals
	const { chunks } = res.locals as { chunks: string[] };
	// Get number of questions and selection strategy from request body
	const { strategy, questionCount } = req.body as {
		strategy: QuestionGenerationStrategy;
		questionCount: number;
	};

	try {
		// Get selected chunks
		const selectedChunks = await selectChunks(chunks, questionCount, strategy);

		// for (let i = 0; i < selectedChunks.length; i++) {
		// 	console.log(`Selected Chunk ${i + 1}:`, selectedChunks[i], "\n\n");
		// }

		// Add selected chunks to res.locals
		(res.locals.selectedChunks as string[]) = selectedChunks;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
