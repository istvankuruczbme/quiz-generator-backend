import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import deleteQuizPhoto from "../../../services/db/quiz/deleteQuizPhoto";

export default async function deleteQuizPhotoMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizFullPrivate };

	try {
		// Delete quiz photo
		await deleteQuizPhoto(quiz.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
