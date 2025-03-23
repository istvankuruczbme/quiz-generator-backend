import { Request, Response, NextFunction } from "express";
import { QuizDB } from "../../../types/quizTypes";
import updateQuizPhotoUrl from "../../../services/db/quiz/updateQuizPhotoUrl";

export default async function updateQuizPhotoMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and photo URL from res.locals
	const { quiz, photoUrl } = res.locals as { quiz: QuizDB; photoUrl: string | null };

	// Check if there is a photo URL
	if (photoUrl == null) return next();

	try {
		// Update photo URL of quiz
		await updateQuizPhotoUrl(quiz.id, photoUrl);

		// Update quiz in res.locals
		(res.locals.quiz as QuizDB).photoUrl = photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
