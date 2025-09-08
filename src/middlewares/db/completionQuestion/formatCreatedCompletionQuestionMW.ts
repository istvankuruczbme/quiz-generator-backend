import { Request, Response, NextFunction } from "express";
import { QuizPublic } from "../../../types/quizTypes";
import {
	CompletionQuestionPublic,
	CompletionQuestionSelect,
} from "../../../types/completionQuestionTypes";
import AppError from "../../../classes/AppError";

export default function formatCreatedCompletionQuestionMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz and completion question
	const { quiz, completionQuestion } = res.locals as {
		quiz: QuizPublic;
		completionQuestion: CompletionQuestionSelect;
	};

	try {
		// Get question from quiz
		const question = quiz.questions.find(
			(question) => question.id === completionQuestion.questionId
		);

		// Check question
		if (!question) throw new AppError({ message: "Question not found.", status: 404 });

		// Update completion question in res.locals
		(res.locals.completionQuestion as CompletionQuestionPublic) = {
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
