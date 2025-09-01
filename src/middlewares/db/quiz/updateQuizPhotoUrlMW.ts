import { Request, Response, NextFunction } from "express";
import { QuizSelect } from "../../../types/quizTypes";
import updateQuiz from "../../../services/db/quiz/updateQuiz";
import { CreateQuizData } from "../../../utils/db/quiz/validation/schemas/createQuizSchema";

export default async function updateQuizPhotoUrlMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and quiz data
	const {
		quiz,
		quizData: { photoUrl },
	} = res.locals as { quiz: QuizSelect; quizData: CreateQuizData };

	// No new photo URL
	if (!photoUrl) return next();

	try {
		// Update photo URL of quiz
		await updateQuiz(quiz.id, { photoUrl });

		// Update quiz in res.locals
		(res.locals.quiz as QuizSelect).photoUrl = photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
