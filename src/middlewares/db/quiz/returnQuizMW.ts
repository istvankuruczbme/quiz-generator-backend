import { Request, Response } from "express";
import { Quiz, QuizFull, QuizSummary } from "../../../types/quizTypes";

export default function returnQuizMW(_: Request, res: Response) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizSummary | QuizFull };

	// Send quiz
	res.status(200).json(quiz);
}
