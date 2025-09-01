import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPointsSelect, QuestionPointsUpdate } from "../../../types/questionPointsTypes";
import AppError from "../../../classes/AppError";

export default async function updateQuestionPointsByQuestionId(
	questionId: string,
	data: QuestionPointsUpdate
): Promise<QuestionPointsSelect> {
	// Update points
	const [points] = await db
		.update(QuestionPointsTable)
		.set(data)
		.where(eq(QuestionPointsTable.questionId, questionId))
		.returning();

	// Check points
	if (!points) throw new AppError({ message: "Error updating question points." });

	// Return points
	return points;
}
