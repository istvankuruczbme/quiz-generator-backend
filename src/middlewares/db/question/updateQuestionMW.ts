import { Request, Response, NextFunction } from "express";
import { QuestionPrivate, QuestionSelect } from "../../../types/questionTypes";
import updateQuestion from "../../../services/db/question/updateQuestion";
import { UpdateQuestionData } from "../../../utils/db/question/validation/schemas/updateQuestionSchema";

export default async function updateQuestionMW(_: Request, res: Response, next: NextFunction) {
	// Get question and question data
	const {
		question,
		questionData: { text, photoUrl },
	} = res.locals as {
		question: QuestionPrivate;
		questionData: UpdateQuestionData;
	};

	try {
		// Update question
		const updatedQuestion = await updateQuestion(question.id, { text, photoUrl });

		// Add updated question to res.locals
		(res.locals.updatedQuestion as QuestionSelect) = updatedQuestion;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
