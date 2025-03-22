import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";

export default async function updateQuizPhotoUrl(id: string, photoUrl: string): Promise<void> {
	await db.update(QuizTable).set({ photoUrl }).where(eq(QuizTable.id, id));
}
