import { Request, Response, NextFunction } from "express";
import { Question } from "../../../types/questionTypes";
import uploadQuestionPhoto from "../../../services/db/question/uploadQuestionPhoto";

export default async function uploadQuestionPhotoMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get file from req.body
	const { file } = req;
	// Get question from res.locals
	const { question } = res.locals as { question: Question };

	// Check file
	if (file == undefined) {
		// Add photoUrl to res.locals
		(res.locals.photoUrl as null) = null;

		// Go to next MW
		return next();
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
