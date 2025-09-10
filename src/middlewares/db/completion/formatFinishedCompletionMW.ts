import { Request, Response, NextFunction } from "express";
import { CompletionPrivate, FinishedCompletionWithQuestions } from "../../../types/completionTypes";
import { QuizPrivate } from "../../../types/quizTypes";
import { UserSelect } from "../../../types/userTypes";
import { CompletionQuestionPrivate } from "../../../types/completionQuestionTypes";
import getUserPublicData from "../../../utils/db/user/getUserPublicData";
import AppError from "../../../classes/AppError";

export default function formatFinishedCompletionMW(_: Request, res: Response, next: NextFunction) {
	// Get completion, quiz and user
	const { completion, quiz, user } = res.locals as {
		completion: FinishedCompletionWithQuestions;
		quiz: QuizPrivate;
		user: UserSelect;
	};

	// Map question data
	const questions: CompletionQuestionPrivate[] = quiz.questions.map((question) => {
		// Get completion question
		const questionCompletion = completion.questions.find((q) => q.questionId === question.id);

		// Check question completion
		if (!questionCompletion) throw new AppError({ message: "Question has no answer." });

		// Return question with completion data
		return {
			...question,
			completion: {
				selectedAnswerOptionIds: questionCompletion.selectedAnswerOptionIds,
				answeredAt: questionCompletion.answeredAt,
			},
		};
	});

	// Update completion in res.locals
	(res.locals.completion as CompletionPrivate) = {
		id: completion.id,
		updatedAt: completion.updatedAt,
		createdAt: completion.createdAt,
		finishedAt: completion.finishedAt,
		user: getUserPublicData(user),
		quiz: {
			...quiz,
			questions,
		},
	};

	// Go to next MW
	return next();
}
