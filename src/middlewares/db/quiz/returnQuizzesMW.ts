import { Request, Response } from "express";
import { Quiz } from "../../../types/quizTypes";

export default function returnQuizzesMW(_: Request, res: Response) {
	// Get quizzes from res.locals
	const { quizzes } = res.locals as { quizzes: Quiz[] };

	// Send quizzes
	res.status(200).json(quizzes);
}
