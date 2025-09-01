import { Request, Response, NextFunction } from "express";
import { QuizPrivate, QuizSelect } from "../../../types/quizTypes";
import updateQuiz from "../../../services/db/quiz/updateQuiz";
import { UpdateQuizData } from "../../../utils/db/quiz/validation/schemas/updateQuizSchema";

export default async function updateQuizMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz, quiz data and embedding
	const { quiz, quizData, embedding } = res.locals as {
		quiz: QuizPrivate;
		quizData: UpdateQuizData;
		embedding?: number[];
	};

	try {
		// Update quiz
		const updatedQuiz = await updateQuiz(quiz.id, { ...quizData, embedding });

		// Add updated quiz to res.locals
		(res.locals.updatedQuiz as QuizSelect) = updatedQuiz;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
