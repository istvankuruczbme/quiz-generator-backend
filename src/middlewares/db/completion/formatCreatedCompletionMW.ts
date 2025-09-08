import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import { QuizPublic } from "../../../types/quizTypes";
import { CompletionPublic, CompletionSelect } from "../../../types/completionTypes";
import getUserPublicData from "../../../utils/db/user/getUserPublicData";

export default function formatCreatedCompletionMW(_: Request, res: Response, next: NextFunction) {
	// Get user, quiz and completion
	const { user, quiz, completion } = res.locals as {
		user: UserSelect;
		quiz: QuizPublic;
		completion: CompletionSelect;
	};

	// Update completion in res.locals
	(res.locals.completion as CompletionPublic) = {
		id: completion.id,
		updatedAt: completion.updatedAt,
		createdAt: completion.createdAt,
		finishedAt: completion.finishedAt,
		user: getUserPublicData(user),
		quiz,
	};

	// Go to next MW
	return next();
}
