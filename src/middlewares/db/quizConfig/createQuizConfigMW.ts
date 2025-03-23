import { Request, Response, NextFunction } from "express";
import { QuizConfig, QuizDB } from "../../../types/quizTypes";
import createQuizConfig from "../../../services/db/quizConfig/createQuizConfig";

export default async function createQuizConfigMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz from res.locals
	const { quiz } = res.locals as { quiz: QuizDB };

	try {
		// Create quiz config
		const config = await createQuizConfig(quiz.id);

		// Add config to res.locals
		(res.locals.config as QuizConfig) = config;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
