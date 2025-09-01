import { Request, Response, NextFunction } from "express";
import { QuizPrivate, QuizSelect } from "../../../types/quizTypes";
import getCategory from "../../../services/db/category/getCategory";

export default async function formatUpdatedQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and updated quiz
	const {
		quiz,
		updatedQuiz: { categoryId, userId, deletedAt, ...restUpdatedQuiz },
	} = res.locals as { quiz: QuizPrivate; updatedQuiz: QuizSelect };

	try {
		// Get category
		const category =
			categoryId === quiz.category.id ? quiz.category : await getCategory(categoryId);

		// Update quiz in res.locals
		(res.locals.quiz as QuizPrivate) = {
			...quiz,
			...restUpdatedQuiz,
			category,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
