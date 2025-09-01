import { Request, Response, NextFunction } from "express";
import createQuestion from "../../../services/db/question/createQuestion";
import { QuizPrivate } from "../../../types/quizTypes";
import { CreateQuestionData } from "../../../utils/db/question/validation/schemas/createQuestionSchema";
import { QuestionSelect } from "../../../types/questionTypes";

export default async function createQuestionMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and question data
	const {
		quiz,
		questionData: { text, order },
	} = res.locals as { quiz: QuizPrivate; questionData: CreateQuestionData };

	try {
		// Create question
		const question = await createQuestion({ text, order, quizId: quiz.id });

		// Add question to res.locals
		(res.locals.question as QuestionSelect) = question;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
