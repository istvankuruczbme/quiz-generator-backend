import { Request, Response, NextFunction } from "express";
import { QuestionPrivate } from "../../../types/questionTypes";
import updateQuestionPointsByQuestionId from "../../../services/db/questionPoints/updateQuestionPointsByQuestionId";
import { UpdateQuestionData } from "../../../utils/db/question/validation/schemas/updateQuestionSchema";
import { QuestionPointsSelect } from "../../../types/questionPointsTypes";

export default async function updateQuestionPointsMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get question and question data
	const {
		question,
		questionData: { points },
	} = res.locals as { question: QuestionPrivate; questionData: UpdateQuestionData };

	// Check points
	if (!points) return next();

	try {
		// Update question points
		const updatedQuestionPoints = await updateQuestionPointsByQuestionId(question.id, points);

		// Add updated question points to res.locals
		(res.locals.updatedQuestionPoints as QuestionPointsSelect) = updatedQuestionPoints;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
