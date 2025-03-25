import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { CategoryTable } from "../../../drizzle/schema/category";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { UserTable } from "../../../drizzle/schema/user";
import { QuizData } from "../../../types/quizTypes";

export default async function getQuizData(id: string): Promise<QuizData> {
	// Get quiz summary
	const [quizData] = await db
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
		})
		.from(QuizTable)
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(QuizConfigTable, eq(QuizTable.id, QuizConfigTable.quizId))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.where(eq(QuizTable.id, id));

	// Check if quiz exists
	if (quizData == undefined) throw new Error("quiz/not-found");

	// Return quiz summary
	return quizData;
}
