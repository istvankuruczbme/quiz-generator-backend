import { and, desc, eq, isNull, or } from "drizzle-orm";
import { QUIZ_SUMMARY_COLUMS } from "../../../constants/quiz/quizSummaryColumns";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { QuizSummary } from "../../../types/quizTypes";
import { CategoryTable } from "../../../drizzle/schema/category";
import { UserTable } from "../../../drizzle/schema/user";
import { QuestionTable } from "../../../drizzle/schema/question";
import { CompletionTable } from "../../../drizzle/schema/completion";

export default async function getQuizzesByCompletionCount(params: {
	limit?: number;
	userId: string;
}): Promise<QuizSummary[]> {
	// Get params
	const { limit, userId } = params;

	// Get quiz summaries
	const quizSummaries = await db
		.select(QUIZ_SUMMARY_COLUMS)
		.from(QuizTable)
		.innerJoin(QuizConfigTable, eq(QuizConfigTable.quizId, QuizTable.id))
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.leftJoin(QuestionTable, eq(QuestionTable.quizId, QuizTable.id))
		.leftJoin(CompletionTable, eq(CompletionTable.quizId, QuizTable.id))
		.where(
			and(
				isNull(QuizTable.deletedAt),
				or(
					and(eq(QuizConfigTable.state, "ACTIVE"), eq(QuizConfigTable.visibility, "PUBLIC")),
					eq(QuizTable.userId, userId)
				)
			)
		)
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
		.orderBy((quiz) => desc(quiz.completionCount))
		.limit(limit ?? 5);

	// Return quiz summaries
	return quizSummaries;
}
