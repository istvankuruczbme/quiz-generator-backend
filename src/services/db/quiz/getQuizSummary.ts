import { eq, sql } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { CategoryTable } from "../../../drizzle/schema/category";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { UserTable } from "../../../drizzle/schema/user";
import { QuizSummary } from "../../../types/quizTypes";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuizCompletionTable } from "../../../drizzle/schema/quizCompletion";

export default async function getQuizSummaryById(id: string): Promise<QuizSummary> {
	// Get quiz summary
	const [quizSummary] = await db
		.select({
			id: QuizTable.id,
			category: CategoryTable.name,
			title: QuizTable.title,
			description: QuizTable.description,
			photoUrl: QuizTable.photoUrl,
			updatedAt: QuizTable.updatedAt,
			createdAt: QuizTable.createdAt,
			config: {
				status: QuizConfigTable.status,
				visibility: QuizConfigTable.visibility,
				questionOrder: QuizConfigTable.questionOrder,
			},
			user: {
				id: UserTable.id,
				name: UserTable.name,
				photoUrl: UserTable.photoUrl,
			},
			questionCount: sql<number>`COUNT(DISTINCT ${QuestionTable.id})`,
			completionCount: sql<number>`COUNT(DISTINCT ${QuizCompletionTable.id})`,
		})
		.from(QuizTable)
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(QuizConfigTable, eq(QuizTable.id, QuizConfigTable.quizId))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.leftJoin(QuestionTable, eq(QuizTable.id, QuestionTable.quizId))
		.leftJoin(QuizCompletionTable, eq(QuizTable.id, QuizCompletionTable.quizId))
		.where(eq(QuizTable.id, id))
		.groupBy(
			QuizTable.id,
			CategoryTable.name,
			QuizConfigTable.status,
			QuizConfigTable.visibility,
			QuizConfigTable.questionOrder,
			UserTable.id,
			UserTable.name,
			UserTable.photoUrl
		);

	// Check if quiz exists
	if (quizSummary == undefined) throw new Error("quiz/not-found");

	return quizSummary;
}
