import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPrivate, QuestionPublic } from "../../../types/questionTypes";
import getAnswerOptionsByQuestionId from "../answerOption/getAnswerOptionsByQuestionId";

export default async function getQuestion(
	id: string,
	includeIsCorrect = false
): Promise<QuestionPublic | QuestionPrivate> {
	// Get question
	const [question] = await db
		.select({
			id: QuestionTable.id,
			text: QuestionTable.text,
			photoUrl: QuestionTable.photoUrl,
			order: QuestionTable.order,
			points: {
				correct: QuestionPointsTable.correct,
				wrong: QuestionPointsTable.wrong,
				empty: QuestionPointsTable.empty,
			},
		})
		.from(QuestionTable)
		.innerJoin(QuestionPointsTable, eq(QuestionTable.id, QuestionPointsTable.questionId))
		.where(eq(QuestionTable.id, id));

	// Check if question exists
	if (question == undefined) throw new Error("question/not-found");

	// Get answer options
	const answerOptions = await getAnswerOptionsByQuestionId(question.id, includeIsCorrect);

	// Return question
	return {
		...question,
		answerOptions,
	};
}
