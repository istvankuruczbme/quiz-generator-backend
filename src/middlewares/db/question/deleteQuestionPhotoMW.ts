import { Request, Response, NextFunction } from "express";
import { QuestionPrivate, QuestionPublic } from "../../../types/questionTypes";
import deleteQuestionPhoto from "../../../services/db/question/deleteQuestionPhoto";

export default async function deleteQuestionPhotoMW(_: Request, res: Response, next: NextFunction) {
	// Get question
	const { question } = res.locals as { question: QuestionPrivate };

	// Check if question has a photo URL
	if (!question.photoUrl) return next();

	try {
		// Delete question photo
		await deleteQuestionPhoto(question.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
