import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizUpdatableProperties } from "../../../types/quizTypes";

export default async function updateQuiz(
	id: string,
	newValues: QuizUpdatableProperties
): Promise<void> {
	await db.update(QuizTable).set(newValues).where(eq(QuizTable.id, id));
}
