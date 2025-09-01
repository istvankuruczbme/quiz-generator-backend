import { Request, Response, NextFunction } from "express";
import createQuizEmbedding from "../../../services/db/quiz/createQuizEmbedding";
import { CreateQuizData } from "../../../utils/db/quiz/validation/schemas/createQuizSchema";
import { UpdateQuizData } from "../../../utils/db/quiz/validation/schemas/updateQuizSchema";
import { QuizPrivate } from "../../../types/quizTypes";

export default async function createQuizEmbeddingMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and quiz data
	const {
		quiz,
		quizData: { title, description },
	} = res.locals as {
		quiz?: QuizPrivate;
		quizData: CreateQuizData | UpdateQuizData;
	};

	// Check title and description
	if (
		!title ||
		!description ||
		(quiz && quiz.title === title && quiz.description === description)
	) {
		return next();
	}

	try {
		// Create embedding
		const embedding = await createQuizEmbedding({ title, description });

		// Add embedding to res.locals
		(res.locals.embedding as number[]) = embedding;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
