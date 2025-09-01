import { Request, Response, NextFunction } from "express";
import { QuizSelect } from "../../../types/quizTypes";
import createQuizConfig from "../../../services/db/quizConfig/createQuizConfig";
import { QuizConfigSelect } from "../../../types/quizConfigTypes";

export default async function createQuizConfigMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizSelect };

	try {
		// Create quiz config
		const config = await createQuizConfig({ quizId: quiz.id });

		// Add config to res.locals
		(res.locals.quizConfig as QuizConfigSelect) = config;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
