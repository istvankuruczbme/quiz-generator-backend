import { Request, Response, NextFunction } from "express";
import { QuestionPublic } from "../../../types/questionTypes";
import updateQuestion from "../../../services/db/question/updateQuestion";

export default async function removeQuestionPhotoUrlMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get question from res.locals
	const { question } = res.locals as { question: QuestionPublic };

	// Check if question has a photo URL
	if (question.photoUrl == null) return next();

	try {
		// Update question
		await updateQuestion(question.id, { photoUrl: null });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
