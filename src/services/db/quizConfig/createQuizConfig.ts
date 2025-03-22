import { db } from "../../../drizzle/db";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { QuizConfig } from "../../../types/quizTypes";

export default async function createQuizConfig(quizId: string): Promise<QuizConfig> {
	// Create config
	const [config] = await db.insert(QuizConfigTable).values({ quizId }).returning();

	// Check if config was created
	if (config == undefined) throw new Error("quiz/config/not-created");

	// Return config
	return config;
}
