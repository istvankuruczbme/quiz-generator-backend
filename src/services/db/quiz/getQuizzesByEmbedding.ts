import { and, cosineDistance, desc, eq, gt, isNull, or, sql } from "drizzle-orm";
import { QUIZ_SUMMARY_COLUMS } from "../../../constants/quiz/quizSummaryColumns";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { QuizSummary } from "../../../types/quizTypes";
import { CategoryTable } from "../../../drizzle/schema/category";
import { UserTable } from "../../../drizzle/schema/user";
import { QuestionTable } from "../../../drizzle/schema/question";
import { CompletionTable } from "../../../drizzle/schema/completion";

export default async function getQuizzesByEmbedding(
	embedding: number[],
	params: { similarityThreshold?: number; limit?: number }
): Promise<QuizSummary[]> {
	// Get params
	const { similarityThreshold, limit } = params;

	// Calculate similarity
	const similarity = sql<number>`1 - (${cosineDistance(QuizTable.embedding, embedding)})`;

	// Get quiz summaries
	const quizSummariesRaw = await db
		.select({ ...QUIZ_SUMMARY_COLUMS, similarity })
		.from(QuizTable)
		.innerJoin(QuizConfigTable, eq(QuizConfigTable.quizId, QuizTable.id))
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.leftJoin(QuestionTable, eq(QuestionTable.quizId, QuizTable.id))
		.leftJoin(CompletionTable, eq(CompletionTable.quizId, QuizTable.id))
		.where(
			and(
				isNull(QuizTable.deletedAt),
				and(eq(QuizConfigTable.state, "ACTIVE"), eq(QuizConfigTable.visibility, "PUBLIC")),
				similarityThreshold ? gt(similarity, similarityThreshold) : undefined
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
		.orderBy((quiz) => desc(quiz.similarity))
		.limit(limit ?? 5);

	// Remove similarity from results
	const quizSummaries = quizSummariesRaw.map((quiz) => {
		const { similarity, ...quizSummary } = quiz;
		return quizSummary;
	});

	// Return quiz summaries
	return quizSummaries;
}
