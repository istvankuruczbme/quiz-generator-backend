import { Request, Response, NextFunction } from "express";
import validateQuizData from "../../../services/db/quiz/validateQuizData";

export default async function validateQuizDataMW(req: Request, _: Response, next: NextFunction) {
	// Get quiz data
	const { title, description, categoryId } = req.body as {
		title: unknown;
		description: unknown;
		categoryId: unknown;
	};

	try {
		// Validation
		validateQuizData(title, description, categoryId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
