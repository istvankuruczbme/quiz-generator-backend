import { Request, Response, NextFunction } from "express";
import { Quiz } from "../../../types/quizTypes";
import updateQuiz from "../../../services/db/quiz/updateQuiz";

export default async function updateQuizPhotoUrlMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and photo URL from res.locals
	const { quiz, photoUrl } = res.locals as { quiz: Quiz; photoUrl: string | null };

	// Check if there is a photo URL
	if (photoUrl == null) return next();

	try {
		// Update photo URL of quiz
		await updateQuiz(quiz.id, { photoUrl });

		// Update quiz in res.locals
		(res.locals.quiz as Quiz).photoUrl = photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
