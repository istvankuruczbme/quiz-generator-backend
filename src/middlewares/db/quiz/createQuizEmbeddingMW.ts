import { Request, Response, NextFunction } from "express";
import createQuizEmbedding from "../../../services/db/quiz/createQuizEmbedding";

export default async function createQuizEmbeddingMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz title and description
	const { title, description } = req.body as {
		title: string;
		description: string;
	};

	try {
		// Create embedding
		const embedding = await createQuizEmbedding(title, description);

		// Add embedding to res.locals
		(res.locals.embedding as number[]) = embedding;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
