import { Request, Response, NextFunction } from "express";
import uploadQuizPhoto from "../../../services/db/quiz/uploadQuizPhoto";
import { QuizDB } from "../../../types/quizTypes";

export default async function uploadQuizPhotoMW(req: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizDB };
	// Get file from req.body
	const { file } = req;

	// Check file
	if (file == undefined) {
		// Add photoUrl to res.locals
		(res.locals.photoUrl as null) = null;

		// Go to next MW
		return next();
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
