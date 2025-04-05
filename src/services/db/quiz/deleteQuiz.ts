import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";

export default async function deleteQuiz(id: string): Promise<void> {
	await db.delete(QuizTable).where(eq(QuizTable.id, id));
}
