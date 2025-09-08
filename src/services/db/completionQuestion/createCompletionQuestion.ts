import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { CompletionQuestionTable } from "../../../drizzle/schema/completionQuestion";
import {
	CompletionQuestionInsert,
	CompletionQuestionSelect,
} from "../../../types/completionQuestionTypes";

export default async function createCompletionQuestion(
	data: CompletionQuestionInsert
): Promise<CompletionQuestionSelect> {
	// Create completion question
	const [question] = await db.insert(CompletionQuestionTable).values(data).returning();

	// Check completion question
	if (!question) throw new AppError({ message: "Error creating completion question." });

	// Return completion question
	return question;
}
