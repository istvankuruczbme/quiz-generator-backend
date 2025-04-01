import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";

export default async function deleteQuestionPointsByQuestionId(questionId: string): Promise<void> {
	await db.delete(QuestionPointsTable).where(eq(QuestionPointsTable.questionId, questionId));
}
