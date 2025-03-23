import { db } from "../../../drizzle/db";
import { Quiz } from "../../../types/quizTypes";

export default async function getUserQuizzes(userId: string): Promise<Quiz[]> {
	// Get quizzes
	const quizzes = await db.query.QuizTable.findMany({
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
		where: (quiz, { eq, and, isNull }) => and(eq(quiz.userId, userId), isNull(quiz.deletedAt)),
	});

	// Return quizzes
	return quizzes as Quiz[];
}
