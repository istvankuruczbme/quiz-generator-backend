import { QuizFull } from "../../../types/quizTypes";
import getQuesitonsByQuizId from "../question/getQuesitonsByQuizId";
import getQuizData from "./getQuizData";

export default async function getQuiz(id: string): Promise<QuizFull> {
	// Get base quiz data
	const quizData = await getQuizData(id);

	// Get quiz questions
	const questions = await getQuesitonsByQuizId(quizData.id);

	// Return full quiz
	return {
		...quizData,
		questions,
	};
}
