import { Request, Response, NextFunction } from "express";
import { QuestionPrivate } from "../../../types/questionTypes";
import { AnswerOptionPrivate } from "../../../types/answerOptionTypes";
import createAnswerOption from "../../../services/db/answerOption/createAnswerOption";
import updateAnswerOption from "../../../services/db/answerOption/updateAnswerOption";
import deleteAnswerOption from "../../../services/db/answerOption/deleteAnswerOption";

export default function updateAnswerOptionsMW(req: Request, res: Response, next: NextFunction) {
	// Get answer options from request body
	const { answerOptions } = req.body as { answerOptions: AnswerOptionPrivate[] };
	// Get question from res.locals
	const { question } = res.locals as { question: QuestionPrivate };

	// Get answer option IDs
	const answerOptionIds = answerOptions.map((option) => option.id);

	// Get question answer option IDs
	const questionAnswerOptionIds = question.answerOptions.map((option) => option.id);

	// Get answer options to add, update, delete
	const answerOptionsToAdd = answerOptions.filter(
		(option) => !questionAnswerOptionIds.includes(option.id)
	);
	const answerOptionsToUpdate = answerOptions.filter((option) =>
		questionAnswerOptionIds.includes(option.id)
	);
	const answerOptionsToDelete = question.answerOptions.filter(
		(option) => !answerOptionIds.includes(option.id)
	);

	try {
		// Add answer options
		answerOptionsToAdd.forEach(async (option) => {
			await createAnswerOption(option.text, option.isCorrect, question.id);
		});

		// Update answer options
		answerOptionsToUpdate.forEach(async (option) => {
			await updateAnswerOption(option.id, { text: option.text, isCorrect: option.isCorrect });
		});

		// Delete answer options
		answerOptionsToDelete.forEach(async (option) => {
			await deleteAnswerOption(option.id);
		});

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
