import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import createQuiz from "../../../services/db/quiz/createQuiz";
import { Quiz } from "../../../types/quizTypes";

export default async function createQuizMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz data from req.body
	const { title, description, categoryId } = req.body as {
		title: string;
		description: string;
		categoryId: string;
	};
	// Get user and embedding from res.locals
	const { user, embedding } = res.locals as { user: UserSelect; embedding: number[] };

	try {
		// Create quiz
		const quiz = await createQuiz(title, description, categoryId, embedding, user.id);

		// Add quiz to res.locals
		(res.locals.quiz as Quiz) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
