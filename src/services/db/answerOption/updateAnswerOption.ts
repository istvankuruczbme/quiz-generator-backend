import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";
import { AnswerOptionUpdatableProperties } from "../../../types/answerOptionTypes";

export default async function updateAnswerOption(
	id: string,
	newValues: AnswerOptionUpdatableProperties
): Promise<void> {
	await db.update(AnswerOptionTable).set(newValues).where(eq(AnswerOptionTable.id, id));
}
