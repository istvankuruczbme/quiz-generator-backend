import { Request, Response, NextFunction } from "express";
import { QuestionPrivate } from "../../../types/questionTypes";
import updateAnswerOption from "../../../services/db/answerOption/updateAnswerOption";
import { UpdateQuestionData } from "../../../utils/db/question/validation/schemas/updateQuestionSchema";
import createAnswerOptions from "../../../services/db/answerOption/createAnswerOptions";
import deleteAnswerOptions from "../../../services/db/answerOption/deleteAnswerOptions";
import { AnswerOptionPrivate } from "../../../types/answerOptionTypes";

export default async function updateAnswerOptionsMW(_: Request, res: Response, next: NextFunction) {
	// Get question and question data
	const {
		question,
		questionData: { answerOptions },
	} = res.locals as { question: QuestionPrivate; questionData: UpdateQuestionData };

	// Check answer options
	if (!answerOptions) return next();

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
		const newAnswerOptionsData = answerOptionsToAdd.map((option) => ({
			text: option.text,
			isCorrect: option.isCorrect,
			questionId: question.id,
		}));
		const newAnswerOptions =
			newAnswerOptionsData.length > 0 ? await createAnswerOptions(newAnswerOptionsData) : [];

		// Update answer options
		const updatedAnswerOptions = await Promise.all(
			answerOptionsToUpdate.map(async (option) => {
				const updatedOption = await updateAnswerOption(option.id, {
					text: option.text,
					isCorrect: option.isCorrect,
				});
				return updatedOption;
			})
		);

		// Delete answer options
		const deleteAnswerOptionIds = answerOptionsToDelete.map((option) => option.id);
		if (deleteAnswerOptionIds.length > 0) {
			await deleteAnswerOptions(deleteAnswerOptionIds);
		}

		// Add answer options to res.locals
		(res.locals.updatedAnswerOptions as AnswerOptionPrivate[]) = [
			...question.answerOptions,
			...newAnswerOptions,
		]
			.map((option) => {
				const updatedOption = updatedAnswerOptions.find((o) => o.id === option.id);
				if (updatedOption) {
					const { questionId, ...restUpdatedOption } = updatedOption;
					return restUpdatedOption;
				}
				return option;
			})
			.filter((option) => !deleteAnswerOptionIds.includes(option.id));

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
