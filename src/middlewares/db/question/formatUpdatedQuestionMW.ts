import { Request, Response, NextFunction } from "express";
import { QuestionPrivate, QuestionSelect } from "../../../types/questionTypes";
import { QuestionPointsSelect } from "../../../types/questionPointsTypes";
import { AnswerOptionPrivate } from "../../../types/answerOptionTypes";

export default function formatUpdatedQuestionMW(_: Request, res: Response, next: NextFunction) {
	// Get question, updated question, updated points and updated answer options
	const { question, updatedQuestion, updatedQuestionPoints, updatedAnswerOptions } =
		res.locals as {
			question: QuestionPrivate;
			updatedQuestion: QuestionSelect;
			updatedQuestionPoints?: QuestionPointsSelect;
			updatedAnswerOptions?: AnswerOptionPrivate[];
		};

	// Update question in res.locals
	(res.locals.question as QuestionPrivate) = {
		id: updatedQuestion.id,
		text: updatedQuestion.text,
		photoUrl: updatedQuestion.photoUrl,
		order: updatedQuestion.order,
		points: updatedQuestionPoints ?? question.points,
		answerOptions: updatedAnswerOptions ?? question.answerOptions,
	};

	// Go to next MW
	return next();
}
