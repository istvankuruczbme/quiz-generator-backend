import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { Question } from "../../../types/questionTypes";

export default async function createQuestion(
	text: string,
	order: number,
	quizId: string
): Promise<Question> {
	// Create question
	const [question] = await db
		.insert(QuestionTable)
		.values({
			text,
			order,
			quizId,
		})
		.returning();

	// Check if question was created
	if (question == undefined) throw new Error("question/not-created");

	// Return question
	return question;
}
