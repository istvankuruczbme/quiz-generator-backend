import { Request, Response, NextFunction } from "express";
import { ActiveCompletionWithQuestions } from "../../../types/completionTypes";
import updateCompletion from "../../../services/db/completion/updateCompletion";

export default async function finishCompletionMW(_: Request, res: Response, next: NextFunction) {
	// Get completion
	const { completion } = res.locals as { completion: ActiveCompletionWithQuestions };

	try {
		// Finish completion
		const finishedCompletion = await updateCompletion(completion.id, { finishedAt: new Date() });

		// Update completion in res.locals
		(res.locals.completion as ActiveCompletionWithQuestions).finishedAt =
			finishedCompletion.finishedAt;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
