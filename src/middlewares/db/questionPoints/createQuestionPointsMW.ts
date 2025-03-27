import { Request, Response, NextFunction } from "express";
import { Question, QuestionPrivate } from "../../../types/questionTypes";
import createQuestionPoints from "../../../services/db/questionPoints/createQuestionPoints";

export default async function createQuestionPointsMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get question points data from request body
	const { points } = req.body as {
		points: string;
	};
	// Get question from res.locals
	const { question } = res.locals as { question: Question };

	// Get point values
	const { correct, wrong, empty } = JSON.parse(points) as {
		correct: number;
		wrong: number;
		empty: number;
	};

	try {
		// Create question points
		const points = await createQuestionPoints(correct, wrong, empty, question.id);

		// Update question is res.locals
		(res.locals.question as QuestionPrivate) = {
			...question,
			points: {
				correct: points.correct,
				wrong: points.wrong,
				empty: points.empty,
			},
			answerOptions: [],
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
