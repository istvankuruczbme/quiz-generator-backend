import { QuizFullPrivate, QuizFullPublic } from "../../../types/quizTypes";
import getQuesitonsByQuizId from "../question/getQuesitonsByQuizId";
import getQuizData from "./getQuizData";

export default async function getQuiz(
	id: string,
	userId: string
): Promise<QuizFullPublic | QuizFullPrivate> {
	// Get base quiz data
	const quizData = await getQuizData(id);

	// Get quiz questions
	const questions = await getQuesitonsByQuizId(quizData.id, quizData.user.id === userId);

	// Return full quiz
	return {
		...quizData,
		questions,
	};
}
