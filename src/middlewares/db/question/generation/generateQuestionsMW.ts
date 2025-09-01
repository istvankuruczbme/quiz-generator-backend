import { Request, Response, NextFunction } from "express";
import generateQuestion from "../../../../services/openai/generateQuestion";
import { OpenAIQuestionResponse } from "../../../../types/questionTypes";
import { QuestionGenerationData } from "../../../../utils/db/question/generation/validation/schemas/questionGenerationSchema";

export default async function generateQuestionsMW(req: Request, res: Response, next: NextFunction) {
	// Get selected chunks and generation data
	const {
		selectedChunks,
		generationData: { creativity, answerOptionCount },
	} = res.locals as {
		selectedChunks: string[];
		generationData: QuestionGenerationData;
	};

	try {
		// Generate questions
		const questions = await Promise.all(
			selectedChunks.map(
				async (chunk) => await generateQuestion(chunk, answerOptionCount, creativity / 100)
			)
		);

		// Add questions to res.locals
		(res.locals.questions as OpenAIQuestionResponse[]) = questions;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
