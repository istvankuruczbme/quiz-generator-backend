import { Request, Response, NextFunction } from "express";
import { Question } from "../../../types/questionTypes";
import uploadQuestionPhoto from "../../../services/db/question/uploadQuestionPhoto";
import deleteQuestionPhoto from "../../../services/db/question/deleteQuestionPhoto";

export default async function uploadQuestionPhotoMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get file from req.body
	const { file } = req;
	// Get question from res.locals
	const { question } = res.locals as { question: Question };

	// No file
	if (file == undefined) {
		// Add photoUrl to res.locals
		(res.locals.photoUrl as null) = null;

		// Go to next MW
		return next();
	}

	// Check if question already has a photo
	if (question.photoUrl != null) {
		try {
			// Delete question photo
			await deleteQuestionPhoto(question.id);
		} catch (err) {
			return next(err);
		}
	}

	try {
		// Upload photo
		const photoUrl = await uploadQuestionPhoto(file, question.id);

		// Add photo URL to res.locals
		(res.locals.photoUrl as string) = photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
