import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import deleteQuizPhoto from "../../../services/db/quiz/deleteQuizPhoto";

export default async function deleteQuizPhotoMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz
	const { quiz } = res.locals as { quiz: QuizPrivate };

	// Check if quiz has a photo URL
	if (!quiz.photoUrl) return next();

	try {
		// Delete quiz photo
		await deleteQuizPhoto(quiz.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
