import { Request, Response, NextFunction } from "express";
import createQuizEmbedding from "../../../services/db/quiz/createQuizEmbedding";
import { CreateQuizData } from "../../../utils/db/quiz/validation/schemas/createQuizSchema";
import { UpdateQuizData } from "../../../utils/db/quiz/validation/schemas/updateQuizSchema";
import { QuizPrivate } from "../../../types/quizTypes";
import getCategory from "../../../services/db/category/getCategory";

export default async function createQuizEmbeddingMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and quiz data
	const {
		quiz,
		quizData: { title, description, categoryId },
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
		// Get category
		const category = quiz
			? quiz.category.name
			: categoryId
			? (await getCategory(categoryId)).name
			: "";

		// Create embedding
		const embedding = await createQuizEmbedding({ title, description, category });

		// Add embedding to res.locals
		(res.locals.embedding as number[]) = embedding;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
