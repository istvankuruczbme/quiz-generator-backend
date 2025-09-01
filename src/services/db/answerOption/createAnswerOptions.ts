import { db } from "../../../drizzle/db";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";
import { AnswerOptionInsert, AnswerOptionSelect } from "../../../types/answerOptionTypes";

export default async function createAnswerOptions(
	data: AnswerOptionInsert[]
): Promise<AnswerOptionSelect[]> {
	// Create answer options
	const answerOptions = await db.insert(AnswerOptionTable).values(data).returning();

	// Return answer options
	return answerOptions;
}
