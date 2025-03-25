import { QuizSummary } from "../../../types/quizTypes";
import getQuestionCountByQuizId from "../question/getQuestionCountByQuizId";
import getQuizCompletionCountByQuizId from "../quizCompletion/getQuizCompletionCountByQuizId";
import getQuizDatasByUserId from "./getQuizDatasByUserId";

export default async function getQuizSummariesByUserId(userId: string): Promise<QuizSummary[]> {
	// Get quiz summaries
	const quizDatas = await getQuizDatasByUserId(userId);

	// Get question count and completion count of quizzes
	const questionCounts = await Promise.all(
		quizDatas.map(async (quiz) => await getQuestionCountByQuizId(quiz.id))
	);
	const completionCounts = await Promise.all(
		quizDatas.map(async (quiz) => await getQuizCompletionCountByQuizId(quiz.id))
	);

	// Return quizzes
	return quizDatas.map((quizData, i) => ({
		...quizData,
		questionCount: questionCounts[i] || 0,
		completionCount: completionCounts[i] || 0,
	}));
}
