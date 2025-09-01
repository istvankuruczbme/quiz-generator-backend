import { eq, inArray } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";

export default async function deleteAnswerOptions(ids: string[]): Promise<void> {
	await db.delete(AnswerOptionTable).where(inArray(AnswerOptionTable.id, ids));
}
