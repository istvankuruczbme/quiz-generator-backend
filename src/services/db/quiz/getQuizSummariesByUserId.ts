import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { CategoryTable } from "../../../drizzle/schema/category";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { UserTable } from "../../../drizzle/schema/user";
import { QuizSummary } from "../../../types/quizTypes";
import { QuestionTable } from "../../../drizzle/schema/question";
import { CompletionTable } from "../../../drizzle/schema/completion";
import { QUIZ_SUMMARY_COLUMS } from "../../../constants/quiz/quizSummaryColumns";

export default async function getQuizSummariesByUserId(userId: string): Promise<QuizSummary[]> {
	// Get quiz summaries
	const quizSummaries = await db
		.select(QUIZ_SUMMARY_COLUMS)
		.from(QuizTable)
		.innerJoin(QuizConfigTable, eq(QuizConfigTable.quizId, QuizTable.id))
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.leftJoin(QuestionTable, eq(QuestionTable.quizId, QuizTable.id))
		.leftJoin(CompletionTable, eq(CompletionTable.quizId, QuizTable.id))
		.where(and(eq(QuizTable.userId, userId), isNull(QuizTable.deletedAt)))
		.groupBy(
			QuizTable.id,
			CategoryTable.id,
			CategoryTable.name,
			QuizTable.title,
			QuizTable.description,
			QuizTable.photoUrl,
			QuizTable.embedding,
			QuizTable.updatedAt,
			QuizTable.createdAt,
			QuizConfigTable.state,
			QuizConfigTable.visibility,
			QuizConfigTable.questionOrder,
			UserTable.id,
			UserTable.name,
			UserTable.photoUrl
		)
		.orderBy(desc(QuizTable.createdAt));

	// Return quiz summaries
	return quizSummaries;
}
