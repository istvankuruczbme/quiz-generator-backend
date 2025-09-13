import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import getCompletionsByUserId from "../../../services/db/completion/getCompletionsByUserId";
import { CompletionPublic } from "../../../types/completionTypes";

export default async function getUserCompletionsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get user completions
		const completions = await getCompletionsByUserId(user.id);

		// Add completions to res.locals
		(res.locals.completions as CompletionPublic[]) = completions;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
