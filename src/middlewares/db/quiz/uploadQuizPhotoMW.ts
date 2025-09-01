import { Request, Response, NextFunction } from "express";
import uploadQuizPhoto from "../../../services/db/quiz/uploadQuizPhoto";
import { QuizPrivate } from "../../../types/quizTypes";
import deleteQuizPhoto from "../../../services/db/quiz/deleteQuizPhoto";
import { CreateQuizData } from "../../../utils/db/quiz/validation/schemas/createQuizSchema";
import { UpdateQuizData } from "../../../utils/db/quiz/validation/schemas/updateQuizSchema";

export default async function uploadQuizPhotoMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz and quizData
	const { quiz, quizData } = res.locals as {
		quiz: QuizPrivate;
		quizData: CreateQuizData | UpdateQuizData;
	};
	// Get file
	const { file } = req;

	try {
		// Delete photo
		if (quiz.photoUrl && (file || quizData.photoUrl === null)) {
			await deleteQuizPhoto(quiz.id);
		}

		// No file
		if (!file) return next();

		// Upload photo
		const photoUrl = await uploadQuizPhoto(file, quiz.id);

		// Update quiz data in res.local
		(res.locals.quizData as CreateQuizData | UpdateQuizData).photoUrl = photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
