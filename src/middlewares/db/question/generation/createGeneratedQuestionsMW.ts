import { Request, Response, NextFunction } from "express";
import { OpenAIQuestionResponse, QuestionPrivate } from "../../../../types/questionTypes";
import createQuestion from "../../../../services/db/question/createQuestion";
import { QuizPrivate } from "../../../../types/quizTypes";
import createQuestionPoints from "../../../../services/db/questionPoints/createQuestionPoints";
import { AnswerOptionInsert } from "../../../../types/answerOptionTypes";
import createAnswerOptions from "../../../../services/db/answerOption/createAnswerOptions";

export default async function createGeneratedQuestionsMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get quiz and generated questions from res.locals
	const { quiz, questions } = res.locals as {
		quiz: QuizPrivate;
		questions: OpenAIQuestionResponse[];
	};

	try {
		// Create questions
		const dbQuestions = await Promise.all(
			questions.map(async (question, i) => {
				// Create question
				const q = await createQuestion({
					text: question.text,
					order: quiz.questions.length + 1 + i,
					quizId: quiz.id,
				});

				// Create quesiton points
				const points = await createQuestionPoints({
					correct: 3,
					wrong: 0,
					empty: 0,
					questionId: q.id,
				});

				// Create answer options
				const answerOptionsData: AnswerOptionInsert[] = question.answerOptions.map(
					(option) => ({
						text: option.text,
						isCorrect: option.isCorrect,
						questionId: q.id,
					})
				);
				const answerOptions = await createAnswerOptions(answerOptionsData);

				// Return question
				return {
					id: q.id,
					photoUrl: q.photoUrl,
					text: q.text,
					order: q.order,
					points,
					answerOptions,
				};
			})
		);

		// Update quiz in res.locals
		(res.locals.quiz as QuizPrivate) = {
			...quiz,
			questions: [...quiz.questions, ...dbQuestions],
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
