import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import { QuizPublic } from "../../../types/quizTypes";
import { CompletionPublic, CompletionWithQuestions } from "../../../types/completionTypes";
import getUserPublicData from "../../../utils/db/user/getUserPublicData";
import { CompletionQuestionPublic } from "../../../types/completionQuestionTypes";

export default function formatCompletionMW(_: Request, res: Response, next: NextFunction) {
	// Get user, quiz and completion
	const { user, quiz, completion } = res.locals as {
		user: UserSelect;
		quiz: QuizPublic;
		completion: CompletionWithQuestions;
	};

	// Map question data
	const questions: CompletionQuestionPublic[] = quiz.questions.map((question) => {
		// Get completion question
		const questionCompletion = completion.questions.find((q) => q.questionId === question.id);

		// Check question completion
		if (!questionCompletion) return question;

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
	(res.locals.completion as CompletionPublic) = {
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
