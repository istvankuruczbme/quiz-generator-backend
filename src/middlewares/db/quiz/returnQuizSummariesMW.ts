import { Request, Response } from "express";
import { QuizSummary } from "../../../types/quizTypes";

export default function returnQuizSummariesMW(_: Request, res: Response) {
	// Get quiz summaries from res.locals
	const { quizSummaries } = res.locals as { quizSummaries: QuizSummary[] };

	// Send quiz summaries
	res.status(200).json(quizSummaries);
}
