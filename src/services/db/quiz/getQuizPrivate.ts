import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { CategoryTable } from "../../../drizzle/schema/category";
import { UserTable } from "../../../drizzle/schema/user";
import { QuizPrivate } from "../../../types/quizTypes";
import { QuizCompletionTable } from "../../../drizzle/schema/quizCompletion";
import getQuestionsByQuizId from "../question/getQuestionsByQuizId";
import AppError from "../../../classes/AppError";

export default async function getQuizPrivate(
	id: string,
	params: { userId: string }
): Promise<QuizPrivate> {
	// Get params
	const { userId } = params;

	// Get quiz
	const [quiz] = await db
		.select({
			id: QuizTable.id,
			title: QuizTable.title,
			description: QuizTable.description,
			photoUrl: QuizTable.photoUrl,
			category: {
				id: CategoryTable.id,
				name: CategoryTable.name,
			},
			embedding: QuizTable.embedding,
			updatedAt: QuizTable.updatedAt,
			createdAt: QuizTable.createdAt,
			config: {
				state: QuizConfigTable.state,
				visibility: QuizConfigTable.visibility,
				questionOrder: QuizConfigTable.questionOrder,
			},
			user: {
				id: UserTable.id,
				name: UserTable.name,
				photoUrl: UserTable.photoUrl,
			},
			completionCount: sql<number>`COUNT(${QuizCompletionTable.id})`,
		})
		.from(QuizTable)
		.innerJoin(QuizConfigTable, eq(QuizConfigTable.quizId, QuizTable.id))
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.leftJoin(QuizCompletionTable, eq(QuizCompletionTable.quizId, QuizTable.id))
		.where(
			and(
				eq(QuizTable.id, id),
				isNull(QuizTable.deletedAt),
				eq(QuizTable.userId, userId),
				eq(QuizConfigTable.state, "DRAFT")
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
		);

	// Check quiz
	if (!quiz) throw new AppError({ message: "Quiz not found.", status: 404 });

	// Get quiz question
	const questions = await getQuestionsByQuizId(quiz.id);

	// Return quiz
	return {
		...quiz,
		questions,
	};
}
