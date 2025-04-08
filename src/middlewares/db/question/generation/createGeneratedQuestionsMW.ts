import { Request, Response, NextFunction } from "express";
import { OpenAIQuestionResponse } from "../../../../types/questionTypes";
import createQuestion from "../../../../services/db/question/createQuestion";
import { QuizFullPrivate } from "../../../../types/quizTypes";
import createQuestionPoints from "../../../../services/db/questionPoints/createQuestionPoints";
import createAnswerOption from "../../../../services/db/answerOption/createAnswerOption";

export default function createGeneratedQuestionsMW(_: Request, res: Response, next: NextFunction) {
	// Get quiz and generated questions from res.locals
	const { quiz, questions } = res.locals as {
		quiz: QuizFullPrivate;
		questions: OpenAIQuestionResponse[];
	};

	try {
		// Create questions
		questions.forEach(async (question, i) => {
			// Create question
			const { id } = await createQuestion(question.text, quiz.questions.length + 1 + i, quiz.id);

			// Create quesiton points
			await createQuestionPoints(3, 0, 0, id);

			// Create answer options
			question.answerOptions.forEach(async (option) => {
				await createAnswerOption(option.text, option.isCorrect, id);
			});
		});

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
