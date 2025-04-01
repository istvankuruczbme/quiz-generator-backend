import { Request, Response, NextFunction } from "express";
import { QuizFullPrivate } from "../../../types/quizTypes";
import { QuestionPublic } from "../../../types/questionTypes";

export default function validateQuizQuestionMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and question from res.locals
	const { quiz, question } = res.locals as {
		quiz: QuizFullPrivate;
		question: QuestionPublic;
	};

	try {
		// Check if quiz's questions contains question
		const quizQuestionIds = quiz.questions.map((question) => question.id);
		if (!quizQuestionIds.includes(question.id)) throw new Error("question/not-found");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
