import { and, count, eq, gte } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";

export default async function getNumberOfQuizzesByUserIdSinceTime(
	userId: string,
	since: Date
): Promise<number> {
	// Get count of user quizzes
	const [quizzes] = await db
		.select({
			count: count(),
		})
		.from(QuizTable)
		.where(and(eq(QuizTable.userId, userId), gte(QuizTable.createdAt, since)));

	// Check if quizzes exists
	if (quizzes == undefined) throw new Error("user/quiz-count-error");

	// Return count
	return quizzes.count;
}
