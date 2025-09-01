import { Request, Response, NextFunction } from "express";
import { QuizPrivate } from "../../../types/quizTypes";
import { QuestionPublic } from "../../../types/questionTypes";
import updateQuestion from "../../../services/db/question/updateQuestion";

export default function reorderQuizQuestionsMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and question
	const { quiz, question } = res.locals as { quiz: QuizPrivate; question: QuestionPublic };

	try {
		// Reorder questions
		quiz.questions.forEach(async (q) => {
			// Check if order has to be updated
			if (q.order <= question.order) return;

			// Update order
			await updateQuestion(q.id, { order: q.order - 1 });
		});

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
