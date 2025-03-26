import { Request, Response, NextFunction } from "express";
import { AnswerOptionInput } from "../../../types/answerOptionTypes";
import createAnswerOption from "../../../services/db/answerOption/createAnswerOption";
import { QuestionPrivate } from "../../../types/questionTypes";

export default async function createAnswerOptionsMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get answer options from request body
	const { answerOptions } = req.body as { answerOptions: AnswerOptionInput[] };
	// Get question from res.locals
	const { question } = res.locals as { question: QuestionPrivate };

	try {
		// Create answer options
		const answerOptionsCreated = await Promise.all(
			answerOptions.map(
				async (option) => await createAnswerOption(option.text, option.isCorrect, question.id)
			)
		);

		// Update question in res.locals
		(res.locals.question as QuestionPrivate) = {
			...question,
			answerOptions: answerOptionsCreated.map((option) => ({
				id: option.id,
				text: option.text,
				isCorrect: option.isCorrect,
			})),
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
