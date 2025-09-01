import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionSelect, QuestionUpdate } from "../../../types/questionTypes";
import AppError from "../../../classes/AppError";

export default async function updateQuestion(
	id: string,
	data: QuestionUpdate
): Promise<QuestionSelect> {
	// Update question
	const [question] = await db
		.update(QuestionTable)
		.set(data)
		.where(eq(QuestionTable.id, id))
		.returning();

	// Check question
	if (!question) throw new AppError({ message: "Error updating question." });

	// Return question
	return question;
}
