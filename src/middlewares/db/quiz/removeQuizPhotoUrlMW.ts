import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import updateQuiz from "../../../services/db/quiz/updateQuiz";

export default async function removeQuizPhotoUrlMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizFullPrivate };

	// Check if quiz has a photo URL
	if (quiz.photoUrl == null) return next();

	try {
		// Update quiz
		await updateQuiz(quiz.id, { photoUrl: null });

		// Go ot next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
