import { db } from "../../../drizzle/db";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPoints } from "../../../types/questionTypes";

export default async function createQuestionPoints(
	correct: number,
	wrong: number,
	empty: number,
	questionId: string
): Promise<QuestionPoints> {
	// Create question points
	const [points] = await db
		.insert(QuestionPointsTable)
		.values({
			correct,
			wrong,
			empty,
			questionId,
		})
		.returning();

	// Check if question points was created
	if (points == undefined) throw new Error("question/points/not-created");

	// Return question points
	return points;
}
