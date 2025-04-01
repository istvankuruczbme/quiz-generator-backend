import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";

export default async function deleteAnswerOption(id: string): Promise<void> {
	await db.delete(AnswerOptionTable).where(eq(AnswerOptionTable.id, id));
}
