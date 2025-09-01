import { Request, Response, NextFunction } from "express";
import { QuestionSelect } from "../../../types/questionTypes";
import uploadQuestionPhoto from "../../../services/db/question/uploadQuestionPhoto";
import deleteQuestionPhoto from "../../../services/db/question/deleteQuestionPhoto";
import { CreateQuestionData } from "../../../utils/db/question/validation/schemas/createQuestionSchema";
import { UpdateQuestionData } from "../../../utils/db/question/validation/schemas/updateQuestionSchema";

export default async function uploadQuestionPhotoMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get question and question data
	const { question, questionData } = res.locals as {
		question: QuestionSelect;
		questionData: CreateQuestionData | UpdateQuestionData;
	};
	// Get file from req.body
	const { file } = req;

	try {
		// Delete question photo
		if (question.photoUrl && (file || questionData.photoUrl === null)) {
			await deleteQuestionPhoto(question.id);
		}

		// No file
		if (!file) return next();

		// Upload photo
		const photoUrl = await uploadQuestionPhoto(file, question.id);

		// Add photo URL to res.locals
		(res.locals.questionData as CreateQuestionData | UpdateQuestionData).photoUrl = photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
