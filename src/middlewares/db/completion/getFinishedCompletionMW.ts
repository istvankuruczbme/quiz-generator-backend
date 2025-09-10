import { Request, Response, NextFunction } from "express";
import getFinishedCompletion from "../../../services/db/completion/getFinishedCompletion";
import { UserSelect } from "../../../types/userTypes";
import { ActiveCompletionWithQuestions } from "../../../types/completionTypes";

export default async function getFinishedCompletionMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get user
	const { user } = res.locals as { user: UserSelect };
	// Get completion ID
	const { completionId } = req.params as { completionId: string };

	try {
		// Get completion
		const completion = await getFinishedCompletion(completionId, { userId: user.id });

		// Add completion to res.locals
		(res.locals.completion as ActiveCompletionWithQuestions) = completion;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
