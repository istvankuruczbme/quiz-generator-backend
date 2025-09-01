import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";
import { AnswerOptionSelect, AnswerOptionUpdate } from "../../../types/answerOptionTypes";
import AppError from "../../../classes/AppError";

export default async function updateAnswerOption(
	id: string,
	data: AnswerOptionUpdate
): Promise<AnswerOptionSelect> {
	// Update answer option
	const [option] = await db
		.update(AnswerOptionTable)
		.set(data)
		.where(eq(AnswerOptionTable.id, id))
		.returning();

	// Check answer option
	if (!option) throw new AppError({ message: "Error updating answer option." });

	// Return answer option
	return option;
}
