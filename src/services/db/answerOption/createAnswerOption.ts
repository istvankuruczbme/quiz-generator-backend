import { db } from "../../../drizzle/db";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";
import { AnswerOption } from "../../../types/answerOptionTypes";

export default async function createAnswerOption(
	text: string,
	isCorrect: boolean,
	questionId: string
): Promise<AnswerOption> {
	// Create answer option
	const [option] = await db
		.insert(AnswerOptionTable)
		.values({
			text,
			isCorrect,
			questionId,
		})
		.returning();

	// Check if answer option was created
	if (option == undefined) throw new Error("question/answer-option-not-created");

	// Return answer option
	return option;
}
