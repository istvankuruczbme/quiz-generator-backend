import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { QuizConfigUpdatableProperties } from "../../../types/quizTypes";

export default async function updateQuizConfigByQuizId(
	quizId: string,
	newValues: QuizConfigUpdatableProperties
): Promise<void> {
	await db.update(QuizConfigTable).set(newValues).where(eq(QuizConfigTable.quizId, quizId));
}
