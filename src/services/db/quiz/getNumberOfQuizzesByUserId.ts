import { count, eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";

export default async function getNumberOfQuizzesByUserId(userId: string): Promise<number> {
	// Get count of user quizzes
	const [quizzes] = await db
		.select({
			count: count(),
		})
		.from(QuizTable)
		.where(eq(QuizTable.userId, userId));

	// Check if quizzes exists
	if (quizzes == undefined) throw new Error("user/quiz-count-error");

	// Return count
	return quizzes.count;
}
