import { Request, Response, NextFunction } from "express";
import getQuestion from "../../../services/db/question/getQuestionPrivate";
import { QuestionPrivate } from "../../../types/questionTypes";
import { QuizPrivate } from "../../../types/quizTypes";

export default async function getQuestionPrivateMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz
	const { quiz } = res.locals as { quiz: QuizPrivate };
	// Get question ID
	const { questionId } = req.params as { questionId: string };

	try {
		// Get question
		const question = await getQuestion(questionId, { quizId: quiz.id });

		// Add question to res.locals
		(res.locals.question as QuestionPrivate) = question;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
