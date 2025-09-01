import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { QuizConfigSelect, QuizConfigUpdate } from "../../../types/quizConfigTypes";
import AppError from "../../../classes/AppError";

export default async function updateQuizConfigByQuizId(
	quizId: string,
	data: QuizConfigUpdate
): Promise<QuizConfigSelect> {
	// Update quiz config
	const [config] = await db
		.update(QuizConfigTable)
		.set(data)
		.where(eq(QuizConfigTable.quizId, quizId))
		.returning();

	// Check config
	if (!config) throw new AppError({ message: "Error updating quiz config." });

	// Return config
	return config;
}
