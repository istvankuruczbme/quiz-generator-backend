import { Request, Response } from "express";
import { Quiz } from "../../../types/quizTypes";

export default function returnQuizMW(_: Request, res: Response) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: Quiz };

	// Send quiz
	res.status(200).json(quiz);
}
