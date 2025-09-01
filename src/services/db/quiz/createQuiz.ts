import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizInsert, QuizSelect } from "../../../types/quizTypes";

export default async function createQuiz(data: QuizInsert): Promise<QuizSelect> {
	// Create quiz
	const [quiz] = await db.insert(QuizTable).values(data).returning();

	// Check if quiz was created
	if (!quiz) throw new AppError({ message: "Error creating quiz." });

	// Return quiz
	return quiz;
}
