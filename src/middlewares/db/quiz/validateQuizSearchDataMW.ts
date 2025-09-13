import { Request, Response, NextFunction } from "express";
import validateQuizSearchData from "../../../utils/db/quiz/validation/validateQuizSearchData";
import { QuizSearchData } from "../../../utils/db/quiz/validation/schemas/quizSearchSchema";

export default function validateQuizSearchDataMW(req: Request, res: Response, next: NextFunction) {
	// Get params
	const { searchText, categoryIds, limit } = req.query as {
		searchText?: string;
		categoryIds?: string;
		limit: string;
	};

	try {
		// Validation
		const quizSearchData = validateQuizSearchData({
			searchText,
			categoryIds: categoryIds ? JSON.parse(categoryIds) : undefined,
			limit: parseInt(limit),
		});

		// Add search data to res.locals
		(res.locals.quizSearchData as QuizSearchData) = quizSearchData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
