import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionUpdatableProperties } from "../../../types/questionTypes";

export default async function updateQuestion(
	id: string,
	newValues: QuestionUpdatableProperties
): Promise<void> {
	await db.update(QuestionTable).set(newValues).where(eq(QuestionTable.id, id));
}
