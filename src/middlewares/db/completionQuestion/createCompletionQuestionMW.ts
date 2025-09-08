import { Request, Response, NextFunction } from "express";
import { CreateCompletionQuestionData } from "../../../utils/db/completionQuestion/validation/schemas/createCompletionQuestionSchema";
import createCompletionQuestion from "../../../services/db/completionQuestion/createCompletionQuestion";
import { CompletionQuestionSelect } from "../../../types/completionQuestionTypes";

export default async function createCompletionQuestionMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get completion ID
	const { completionId } = req.params as { completionId: string };
	// Get completion question data
	const {
		completionQuestionData: { selectedAnswerOptions, questionId },
	} = res.locals as {
		completionQuestionData: CreateCompletionQuestionData;
	};

	try {
		// Create completion question
		const completionQuestion = await createCompletionQuestion({
			selectedAnswerOptionIds: selectedAnswerOptions,
			questionId,
			completionId,
		});

		// Add completion question to res.locals
		(res.locals.completionQuestion as CompletionQuestionSelect) = completionQuestion;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
