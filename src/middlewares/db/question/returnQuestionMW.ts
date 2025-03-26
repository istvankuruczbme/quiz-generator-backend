import { Request, Response } from "express";
import { QuestionPrivate } from "../../../types/questionTypes";

export default function returnQuestionMW(_: Request, res: Response) {
	// Get question from res.locals
	const { question } = res.locals as { question: QuestionPrivate };

	// Send question
	res.status(200).json(question);
}
