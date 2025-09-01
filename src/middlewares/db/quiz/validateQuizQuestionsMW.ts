import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import { QuestionsOrderData } from "../../../utils/db/question/validation/schemas/questionsOrderSchema";
import AppError from "../../../classes/AppError";

export default async function validateQuizQuestionsMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz and questions order data
	const {
		quiz,
		questionsOrderData: { questionIds },
	} = res.locals as { quiz: QuizPrivate; questionsOrderData: QuestionsOrderData };

	// Get question IDs of quiz
	const quizQuestionIds = quiz.questions.map((question) => question.id);

	try {
		// Validation
		for (const questionId of questionIds) {
			if (!quizQuestionIds.includes(questionId)) {
				throw new AppError({ message: `Question with ID ${questionId} not found.` });
			}
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
