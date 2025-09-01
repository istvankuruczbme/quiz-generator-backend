import { Request, Response, NextFunction } from "express";
import { QuestionPrivate, QuestionSelect } from "../../../types/questionTypes";
import { QuestionPointsSelect } from "../../../types/questionPointsTypes";
import { AnswerOptionSelect } from "../../../types/answerOptionTypes";

export default function formatCreatedQuestionMW(_: Request, res: Response, next: NextFunction) {
	// Get questionGenerationSchema, question points and answer options
	const { question, questionPoints, answerOptions } = res.locals as {
		question: QuestionSelect;
		questionPoints: QuestionPointsSelect;
		answerOptions: AnswerOptionSelect[];
	};

	// Update question in res.locals
	(res.locals.question as QuestionPrivate) = {
		id: question.id,
		text: question.text,
		photoUrl: question.photoUrl,
		order: question.order,
		points: {
			correct: questionPoints.correct,
			wrong: questionPoints.wrong,
			empty: questionPoints.empty,
		},
		answerOptions: answerOptions.map((option) => ({
			id: option.id,
			text: option.text,
			isCorrect: option.isCorrect,
		})),
	};

	// Go to next MW
	return next();
}
