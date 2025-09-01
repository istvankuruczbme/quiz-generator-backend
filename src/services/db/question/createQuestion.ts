import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionInsert, QuestionSelect } from "../../../types/questionTypes";

export default async function createQuestion(data: QuestionInsert): Promise<QuestionSelect> {
	// Create question
	const [question] = await db.insert(QuestionTable).values(data).returning();

	// Check if question was created
	if (!question) throw new AppError({ message: "Error creating question." });

	// Return question
	return question;
}
