import { QuizSummary } from "../../../types/quizTypes";
import getQuestionCountByQuizId from "../question/getQuestionCountByQuizId";
import getQuizCompletionCountByQuizId from "../quizCompletion/getQuizCompletionCountByQuizId";
import getQuizData from "./getQuizData";

export default async function getQuizSummary(id: string): Promise<QuizSummary> {
	// Get base quiz data
	const quizData = await getQuizData(id);

	// Get question count and completion count of quiz
	const questionCount = await getQuestionCountByQuizId(quizData.id);
	const completionCount = await getQuizCompletionCountByQuizId(quizData.id);

	// Return quiz summary
	return {
		...quizData,
		questionCount,
		completionCount,
	};
}
