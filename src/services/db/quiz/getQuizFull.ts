import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { CategoryTable } from "../../../drizzle/schema/category";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { UserTable } from "../../../drizzle/schema/user";
import { QuizFull } from "../../../types/quizTypes";
import getQuesitonsByQuizId from "../question/getQuesitonsByQuizId";

export default async function getQuiz(id: string): Promise<QuizFull> {
	// Get quiz
	const [quizFull] = await db
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
	if (quizFull == undefined) throw new Error("quiz/not-found");

	// Get quiz questions
	const questions = await getQuesitonsByQuizId(quizFull.id);

	// Return quiz
	return {
		...quizFull,
		questions,
	};
}
