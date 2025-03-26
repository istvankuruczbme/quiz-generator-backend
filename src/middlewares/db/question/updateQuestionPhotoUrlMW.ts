import { Request, Response, NextFunction } from "express";
import { Question } from "../../../types/questionTypes";
import updateQuestionPhotoUrl from "../../../services/db/question/updateQuestionPhotoUrl";

export default async function updateQuestionPhotoUrlMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get question and photo URL from res.locals
	const { question, photoUrl } = res.locals as { question: Question; photoUrl: string | null };

	// Check if there is a photo URL
	if (photoUrl == null) return next();

	try {
		// Update photo URL of question
		await updateQuestionPhotoUrl(question.id, photoUrl);

		// Update question in res.locals
		(res.locals.question as Question).photoUrl = photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
