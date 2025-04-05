import { Request, Response, NextFunction } from "express";
import uploadQuizPhoto from "../../../services/db/quiz/uploadQuizPhoto";
import { Quiz } from "../../../types/quizTypes";
import deleteQuizPhoto from "../../../services/db/quiz/deleteQuizPhoto";

export default async function uploadQuizPhotoMW(req: Request, res: Response, next: NextFunction) {
	// Get file from req.body
	const { file } = req;
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: Quiz };

	// No file
	if (file == undefined) {
		// Add photoUrl to res.locals
		(res.locals.photoUrl as null) = null;

		// Go to next MW
		return next();
	}

	// Check if quiz already has a photo
	if (quiz.photoUrl != null) {
		try {
			// Delete quiz photo
			await deleteQuizPhoto(quiz.id);
		} catch (err) {
			return next(err);
		}
	}

	try {
		// Upload photo
		const photoUrl = await uploadQuizPhoto(file, quiz.id);

		// Add photo URL to res.locals
		(res.locals.photoUrl as string) = photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
