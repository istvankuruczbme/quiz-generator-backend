import { Request, Response, NextFunction } from "express";
import generateQuestion from "../../../../services/openai/generateQuestion";
import { OpenAIQuestionResponse } from "../../../../types/questionTypes";

export default async function generateQuestionsMW(req: Request, res: Response, next: NextFunction) {
	// Get selected chunks and creativity from res.locals
	const { selectedChunks } = res.locals as { selectedChunks: string[] };
	// Get answer option count from request body
	const { answerOptionCount, creativity } = req.body as {
		creativity: number;
		answerOptionCount: number;
	};

	try {
		// Generate questions
		const questions = await Promise.all(
			selectedChunks.map(
				async (chunk) => await generateQuestion(chunk, answerOptionCount, creativity / 100)
			)
		);

		// Add questions to res.locals
		(res.locals.questions as OpenAIQuestionResponse[]) = questions || [];

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
