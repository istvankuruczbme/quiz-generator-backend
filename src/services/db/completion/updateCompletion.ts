import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { CompletionTable } from "../../../drizzle/schema/completion";
import { CompletionSelect, CompletionUpdate } from "../../../types/completionTypes";
import AppError from "../../../classes/AppError";

export default async function updateCompletion(
	id: string,
	data: CompletionUpdate
): Promise<CompletionSelect> {
	// Update completion
	const [completion] = await db
		.update(CompletionTable)
		.set(data)
		.where(eq(CompletionTable.id, id))
		.returning();

	// Check completion
	if (!completion) throw new AppError({ message: "Error updating completion." });

	// Return completion
	return completion;
}
