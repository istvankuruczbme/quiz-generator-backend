import { Request, Response } from "express";
import {
	CompletionQuestionPrivate,
	CompletionQuestionPublic,
} from "../../../types/completionQuestionTypes";

export default function returnCompletionQuestionMW(_: Request, res: Response) {
	// Get completion question
	const { completionQuestion } = res.locals as {
		completionQuestion: CompletionQuestionPublic | CompletionQuestionPrivate;
	};

	// Rerurn completion question
	res.status(200).json(completionQuestion);
}
