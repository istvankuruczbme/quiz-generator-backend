import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import createQuiz from "../../../services/db/quiz/createQuiz";
import { QuizDB } from "../../../types/quizTypes";

export default async function createQuizMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz data from req.body
	const { title, description, categoryId } = req.body as {
		title: string;
		description: string;
		categoryId: string;
	};
	// Get user and embedding from res.locals
	const { user, embedding } = res.locals as { user: User; embedding: number[] };

	try {
		// Create quiz
		const quiz = await createQuiz(title, description, categoryId, embedding, user.id);

		// Add quiz to res.locals
		(res.locals.quiz as QuizDB) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
