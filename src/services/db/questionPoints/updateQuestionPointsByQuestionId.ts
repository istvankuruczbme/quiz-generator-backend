import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPointsUpdatableProperties } from "../../../types/questionTypes";

export default async function updateQuestionPointsByQuestionId(
	questionId: string,
	newValues: QuestionPointsUpdatableProperties
): Promise<void> {
	await db
		.update(QuestionPointsTable)
		.set(newValues)
		.where(eq(QuestionPointsTable.questionId, questionId));
}
