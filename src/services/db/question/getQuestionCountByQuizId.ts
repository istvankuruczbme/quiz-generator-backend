import { count, eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuizTable } from "../../../drizzle/schema/quiz";

export default async function getQuestionCountByQuizId(quizId: string): Promise<number> {
	// Get question count of quiz
	const [questionCount] = await db
		.select({
			count: count(),
		})
		.from(QuestionTable)
		.rightJoin(QuizTable, eq(QuestionTable.quizId, QuizTable.id))
		.where(eq(QuestionTable.quizId, quizId));

	// Check if value exists
	if (questionCount == undefined) throw new Error("quiz/question-count-missing");

	// Return count
	return questionCount.count;
}
