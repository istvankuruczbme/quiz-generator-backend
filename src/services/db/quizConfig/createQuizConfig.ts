import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { QuizConfigInsert, QuizConfigSelect } from "../../../types/quizConfigTypes";

export default async function createQuizConfig(data: QuizConfigInsert): Promise<QuizConfigSelect> {
	// Create config
	const [config] = await db.insert(QuizConfigTable).values(data).returning();

	// Check if config was created
	if (!config) throw new AppError({ message: "Error creating quiz config." });

	// Return config
	return config;
}
