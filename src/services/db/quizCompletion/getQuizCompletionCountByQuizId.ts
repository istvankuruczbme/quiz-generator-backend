import { count, eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizCompletionTable } from "../../../drizzle/schema/quizCompletion";
import { QuizTable } from "../../../drizzle/schema/quiz";

export default async function getQuizCompletionCountByQuizId(quizId: string): Promise<number> {
	// Get completion count of quiz
	const [commpletionCount] = await db
		.select({
			count: count(),
		})
		.from(QuizCompletionTable)
		.rightJoin(QuizTable, eq(QuizCompletionTable.quizId, QuizTable.id))
		.where(eq(QuizCompletionTable.quizId, quizId));

	// Check if value exists
	if (commpletionCount == undefined) throw new Error("quiz/completion-count-missing");

	// Return count
	return commpletionCount.count;
}
