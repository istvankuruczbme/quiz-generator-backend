import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";

export default async function updateQuestion(
	id: string,
	newValues: Partial<typeof QuestionTable.$inferInsert>
): Promise<void> {
	await db.update(QuestionTable).set(newValues).where(eq(QuestionTable.id, id));
}
