import { Request, Response, NextFunction } from "express";
import { QuestionSelect } from "../../../types/questionTypes";
import createQuestionPoints from "../../../services/db/questionPoints/createQuestionPoints";
import { CreateQuestionData } from "../../../utils/db/question/validation/schemas/createQuestionSchema";
import { QuestionPointsSelect } from "../../../types/questionPointsTypes";

export default async function createQuestionPointsMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get question and question data
	const {
		question,
		questionData: { points },
	} = res.locals as { question: QuestionSelect; questionData: CreateQuestionData };

	try {
		// Create question points
		const createdPoints = await createQuestionPoints({ ...points, questionId: question.id });

		// Update question is res.locals
		(res.locals.questionPoints as QuestionPointsSelect) = createdPoints;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
