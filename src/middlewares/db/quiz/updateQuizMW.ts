import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import updateQuiz from "../../../services/db/quiz/updateQuiz";

export default async function updateQuizMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz and embedding from res.locals
	const { quiz, embedding } = res.locals as { quiz: QuizFullPrivate; embedding: number[] };
	// Get quiz data from request body
	const { title, description, categoryId } = req.body as {
		title: string;
		description: string;
		categoryId: string;
	};

	try {
		// Update quiz
		await updateQuiz(quiz.id, { title, description, embedding, categoryId });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
