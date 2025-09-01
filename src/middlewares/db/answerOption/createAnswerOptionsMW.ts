import { Request, Response, NextFunction } from "express";
import { QuestionPrivate, QuestionSelect } from "../../../types/questionTypes";
import { CreateQuestionData } from "../../../utils/db/question/validation/schemas/createQuestionSchema";
import createAnswerOptions from "../../../services/db/answerOption/createAnswerOptions";
import { AnswerOptionSelect } from "../../../types/answerOptionTypes";

export default async function createAnswerOptionsMW(_: Request, res: Response, next: NextFunction) {
	// Get question and question data
	const {
		question,
		questionData: { answerOptions },
	} = res.locals as { question: QuestionSelect; questionData: CreateQuestionData };

	try {
		// Create answer options
		const answerOptionsData = answerOptions.map((option) => ({
			...option,
			questionId: question.id,
		}));
		const createdAnswerOptions = await createAnswerOptions(answerOptionsData);

		// Add answer options to res.locals
		(res.locals.answerOptions as AnswerOptionSelect[]) = createdAnswerOptions;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
