import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { CompletionTable } from "../../../drizzle/schema/completion";
import { CompletionInsert, CompletionSelect } from "../../../types/completionTypes";

export default async function createCompletion(data: CompletionInsert): Promise<CompletionSelect> {
	// Create completion
	const [completion] = await db.insert(CompletionTable).values(data).returning();

	// Check completion
	if (!completion) throw new AppError({ message: "Error creating quiz completion." });

	// Return completion
	return completion;
}
