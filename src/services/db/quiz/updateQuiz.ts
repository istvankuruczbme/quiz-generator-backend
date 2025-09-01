import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizSelect, QuizUpdate } from "../../../types/quizTypes";
import AppError from "../../../classes/AppError";

export default async function updateQuiz(id: string, data: QuizUpdate): Promise<QuizSelect> {
	// Update quiz
	const [quiz] = await db.update(QuizTable).set(data).where(eq(QuizTable.id, id)).returning();

	// Check quiz
	if (!quiz) throw new AppError({ message: "Error updating quiz." });

	// Return quiz
	return quiz;
}
