import { Request, Response, NextFunction } from "express";
import { CompletionWithQuestions } from "../../../types/completionTypes";
import { QuestionPrivate } from "../../../types/questionTypes";
import { CompletionQuestionPrivate } from "../../../types/completionQuestionTypes";
import AppError from "../../../classes/AppError";

export default function getCompletionQuestionPrivateMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get completion and question
	const { completion, question } = res.locals as {
		completion: CompletionWithQuestions;
		question: QuestionPrivate;
	};

	try {
		// Get completion question
		const completionQuestion = completion.questions.find((q) => q.questionId === question.id);

		// Check completion question
		if (!completionQuestion) {
			throw new AppError({ message: "Completion question not found.", status: 404 });
		}

		// Add completion question to res.locals
		(res.locals.completionQuestion as CompletionQuestionPrivate) = {
			...question,
			completion: {
				selectedAnswerOptionIds: completionQuestion.selectedAnswerOptionIds,
				answeredAt: completionQuestion.answeredAt,
			},
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
