import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import createQuiz from "../../../services/db/quiz/createQuiz";
import { CreateQuizData } from "../../../utils/db/quiz/validation/schemas/createQuizSchema";
import { QuizSelect } from "../../../types/quizTypes";

export default async function createQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get user, quiz data and embedding
	const { user, quizData, embedding } = res.locals as {
		user: UserSelect;
		quizData: CreateQuizData;
		embedding: number[];
	};

	try {
		// Create quiz
		const quiz = await createQuiz({
			...quizData,
			embedding,
			userId: user.id,
		});

		// Add quiz to res.locals
		(res.locals.quiz as QuizSelect) = quiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
