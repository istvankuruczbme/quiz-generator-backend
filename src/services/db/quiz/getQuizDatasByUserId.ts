import { and, eq, isNull } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { CategoryTable } from "../../../drizzle/schema/category";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { UserTable } from "../../../drizzle/schema/user";
import { QuizData } from "../../../types/quizTypes";

export default async function getQuizDatasByUserId(userId: string): Promise<QuizData[]> {
	const quizDatas = await db
		.select({
			id: QuizTable.id,
			category: {
				id: CategoryTable.id,
				name: CategoryTable.name,
			},
			title: QuizTable.title,
			description: QuizTable.description,
			photoUrl: QuizTable.photoUrl,
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
		})
		.from(QuizTable)
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(QuizConfigTable, eq(QuizTable.id, QuizConfigTable.quizId))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.where(and(eq(QuizTable.userId, userId), isNull(QuizTable.deletedAt)));

	return quizDatas;
}
