import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizDB } from "../../../types/quizTypes";

export default async function createQuiz(
	title: string,
	description: string,
	categoryId: string,
	embedding: number[],
	userId: string
): Promise<QuizDB> {
	// Create quiz
	const [quiz] = await db
		.insert(QuizTable)
		.values({
			title,
			description,
			categoryId,
			photoUrl: null,
			embedding,
			userId,
		})
		.returning();

	// Check if quiz was created
	if (quiz == undefined) throw new Error("quiz/not-created");

	// Return quiz
	return quiz;
}
