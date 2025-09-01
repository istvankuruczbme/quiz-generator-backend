import { Request, Response, NextFunction } from "express";
import { QuestionSelect } from "../../../types/questionTypes";
import updateQuestion from "../../../services/db/question/updateQuestion";
import { CreateQuestionData } from "../../../utils/db/question/validation/schemas/createQuestionSchema";

export default async function updateQuestionPhotoUrlMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get question and question data
	const {
		question,
		questionData: { photoUrl },
	} = res.locals as {
		question: QuestionSelect;
		questionData: CreateQuestionData;
	};

	// Check if there is a photo URL
	if (!photoUrl) return next();

	try {
		// Update photo URL of question
		const updatedQuestion = await updateQuestion(question.id, {
			photoUrl,
		});

		// Update question in res.locals
		(res.locals.question as QuestionSelect).photoUrl = updatedQuestion.photoUrl;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
