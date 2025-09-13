import { eq, inArray, sql } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { CategoryTable } from "../../../drizzle/schema/category";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { UserTable } from "../../../drizzle/schema/user";
import { QuizPublic } from "../../../types/quizTypes";
import { CompletionTable } from "../../../drizzle/schema/completion";
import getQuestionsPublicByQuizId from "../question/getQuestionsPublicByQuizId";

export default async function getQuizzesPublicByQuizIds(quizIds: string[]): Promise<QuizPublic[]> {
	// Get quiz
	const quizzesRaw = await db
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
			completionCount: sql<number>`COUNT(${CompletionTable.id})`,
		})
		.from(QuizTable)
		.innerJoin(QuizConfigTable, eq(QuizConfigTable.quizId, QuizTable.id))
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.leftJoin(CompletionTable, eq(CompletionTable.quizId, QuizTable.id))
		.where(inArray(QuizTable.id, quizIds))
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

	// Add questions to quizzes
	const quizzes = await Promise.all(
		quizzesRaw.map(async (quiz) => {
			const questions = await getQuestionsPublicByQuizId(quiz.id);
			return { ...quiz, questions };
		})
	);

	// Return quizzes
	return quizzes;
}
