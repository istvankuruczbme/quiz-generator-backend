import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";

export default async function updateQuestionPhotoUrl(id: string, photoUrl: string): Promise<void> {
	await db.update(QuestionTable).set({ photoUrl }).where(eq(QuestionTable.id, id));
}
