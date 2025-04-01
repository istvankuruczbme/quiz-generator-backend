import getQuizByQuestionId from "../../../services/db/quiz/getQuizByQuestionId";

export default async function validateQuizQuestion(
	questionId: string,
	quizId: string
): Promise<void> {
	// Get quiz the question belongs to
	const quiz = await getQuizByQuestionId(questionId);

	// Check same ID
	if (quiz.id !== quizId) throw new Error("quiz/question-not-found");
}
