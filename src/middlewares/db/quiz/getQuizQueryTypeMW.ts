import { Request, Response, NextFunction } from "express";
import quizQueryTypes, { QuizQueryType } from "../../../assets/quizQueryTypes";

export default function getQuizQueryTypeMW(req: Request, res: Response, next: NextFunction) {
	// Get type from request query
	const { type } = req.query as { type: unknown };

	// Check type
	if (type == undefined || typeof type !== "string" || !quizQueryTypes.includes(type)) {
		// Add default query type to res.locals
		(res.locals.queryType as QuizQueryType) = "summary";

		// Go to next MW
		return next();
	}

	// Add type to res.locals
	(res.locals.queryType as QuizQueryType) = type as QuizQueryType;

	// Go to next MW
	return next();
}
