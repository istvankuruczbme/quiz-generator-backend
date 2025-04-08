import { Request, Response, NextFunction } from "express";
import validateQuestionData from "../../../utils/db/question/validateQuestionData";
import validateQuestionPoints from "../../../utils/db/questionPoints/validateQuestionPoints";

export default function validateQuestionDataMW(req: Request, _: Response, next: NextFunction) {
	// Get question data from request body
	const {
		text,
		order,
		answerOptions,
		points: { correct, wrong, empty },
	} = req.body as {
		text: unknown;
		order: unknown;
		answerOptions: unknown;
		points: { correct: unknown; wrong: unknown; empty: unknown };
	};

	try {
		// Validation
		validateQuestionData(text, order, answerOptions);
		validateQuestionPoints(correct, wrong, empty);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
