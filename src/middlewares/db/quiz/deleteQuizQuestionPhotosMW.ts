import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import deleteQuestionPhoto from "../../../services/db/question/deleteQuestionPhoto";

export default function deleteQuizQuestionPhotosMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz
	const { quiz } = res.locals as { quiz: QuizPrivate };

	try {
		// Delete photo of every question
		quiz.questions.forEach(async (question) => {
			await deleteQuestionPhoto(question.id);
		});

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
