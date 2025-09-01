import { Request, Response, NextFunction } from "express";
import updateQuestion from "../../../services/db/question/updateQuestion";
import { QuestionsOrderData } from "../../../utils/db/question/validation/schemas/questionsOrderSchema";
import { QuizPrivate } from "../../../types/quizTypes";

export default function updateQuestionsOrderMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and questions order data
	const {
		quiz,
		questionsOrderData: { questionIds },
	} = res.locals as { quiz: QuizPrivate; questionsOrderData: QuestionsOrderData };

	try {
		// Update order of questions
		questionIds.forEach(async (id, index) => {
			await updateQuestion(id, { order: index + 1 });
		});

		// Update quiz in res.locals
		(res.locals.quiz as QuizPrivate).questions = questionIds.map((questionId, i) => {
			const { order, ...question } = quiz.questions.find(
				(question) => question.id === questionId
			)!;
			return { ...question, order: i + 1 };
		});

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
