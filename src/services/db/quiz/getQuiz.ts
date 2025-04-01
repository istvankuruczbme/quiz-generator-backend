import { QuizFullPrivate } from "../../../types/quizTypes";
import getQuestionsByQuizId from "../question/getQuestionsByQuizId";
import getQuizCompletionCountByQuizId from "../quizCompletion/getQuizCompletionCountByQuizId";
import getQuizData from "./getQuizData";

export default async function getQuiz(id: string): Promise<QuizFullPrivate> {
	// Get base quiz data
	const quizData = await getQuizData(id);

	// Get quiz questions
	const questions = await getQuestionsByQuizId(quizData.id);

	// Get number of completions
	const completionCount = await getQuizCompletionCountByQuizId(quizData.id);

	// Return full quiz
	return {
		...quizData,
		questions,
		completionCount,
	};
}
