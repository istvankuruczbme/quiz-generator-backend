import { Request, Response } from "express";
import { CompletionPrivate, CompletionPublic } from "../../../types/completionTypes";

export default function returnCompletionMW(_: Request, res: Response) {
	// Get completion
	const { completion } = res.locals as { completion: CompletionPublic | CompletionPrivate };

	// Return completion
	res.status(200).json(completion);
}
