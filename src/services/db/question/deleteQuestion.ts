import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";

export default async function deleteQuestion(id: string): Promise<void> {
	await db.delete(QuestionTable).where(eq(QuestionTable.id, id));
}
