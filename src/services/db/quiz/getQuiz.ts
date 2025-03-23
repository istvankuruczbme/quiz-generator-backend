import { db } from "../../../drizzle/db";
import { Quiz } from "../../../types/quizTypes";

export default async function getQuiz(id: string): Promise<Quiz> {
	// Get quiz
	const quiz = await db.query.QuizTable.findFirst({
		columns: {
			categoryId: false,
			userId: false,
		},
		with: {
			config: {
				columns: {
					quizId: false,
				},
			},
			category: true,
			user: true,
		},
		where: (quiz, { eq, and, isNull }) => and(eq(quiz.id, id), isNull(quiz.deletedAt)),
	});

	// Check if quiz exists
	if (quiz == undefined) throw new Error("quiz/not-found");

	// Return quiz
	return quiz as Quiz;
}
