import { and, desc, eq, ilike, inArray, isNull, or, sql } from "drizzle-orm";
import { QUIZ_SUMMARY_COLUMS } from "../../../constants/quiz/quizSummaryColumns";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { QuizSummary } from "../../../types/quizTypes";
import { CategoryTable } from "../../../drizzle/schema/category";
import { UserTable } from "../../../drizzle/schema/user";
import { QuestionTable } from "../../../drizzle/schema/question";
import { CompletionTable } from "../../../drizzle/schema/completion";

export default async function getQuizSummariesByTitleAndCategory(params: {
	titleQuery?: string;
	categoryIds?: string[];
	limit?: number;
	userId: string;
}): Promise<QuizSummary[]> {
	// Get params
	const { titleQuery, categoryIds, limit, userId } = params;

	// Match query
	const rank = sql<number>`ts_rank_cd(${QuizTable.search}, websearch_to_tsquery('english', ${titleQuery}))`;

	// Get quiz summaries
	const quizSummariesRaw = await db
		.select({ ...QUIZ_SUMMARY_COLUMS, rank })
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
				),
				titleQuery
					? sql`${QuizTable.search} @@ websearch_to_tsquery('english', ${titleQuery})`
					: undefined,
				categoryIds && categoryIds.length > 0
					? inArray(QuizTable.categoryId, categoryIds)
					: undefined
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
		.orderBy((quiz) => [desc(quiz.rank), desc(quiz.completionCount)])
		.limit(limit ?? 5);

	// Remove rank from results
	const quizSummaries = quizSummariesRaw.map((quiz) => {
		const { rank, ...quizSummary } = quiz;
		return quizSummary;
	});

	// Return quiz summaries
	return quizSummaries;
}
