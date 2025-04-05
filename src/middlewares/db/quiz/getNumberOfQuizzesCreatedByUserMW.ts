import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import getNumberOfQuizzesByUserId from "../../../services/db/quiz/getNumberOfQuizzesByUserId";

export default async function getNumberOfQuizzesCreatedByUserMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	try {
		// Get number of quizzes the user created
		const quizCount = await getNumberOfQuizzesByUserId(user.id);

		// Add number of quizzes to res.locals
		(res.locals.quizCount as number) = quizCount;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
