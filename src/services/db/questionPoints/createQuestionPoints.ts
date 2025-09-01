import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPointsInsert, QuestionPointsSelect } from "../../../types/questionPointsTypes";

export default async function createQuestionPoints(
	data: QuestionPointsInsert
): Promise<QuestionPointsSelect> {
	// Create question points
	const [points] = await db.insert(QuestionPointsTable).values(data).returning();

	// Check if question points was created
	if (!points) throw new AppError({ message: "Error creating question points." });

	// Return question points
	return points;
}
