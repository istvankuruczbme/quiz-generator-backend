import { Request, Response } from "express";
import { CompletionPrivate, CompletionPublic } from "../../../types/completionTypes";

export default function returnCompletionsMW(_: Request, res: Response) {
	// Get completions from res.locals
	const { completions } = res.locals as { completions: CompletionPublic[] | CompletionPrivate[] };

	// Return completions
	res.status(200).json(completions);
}
