import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPublic } from "../../../types/questionTypes";
import getAnswerOptionsByQuestionId from "../answerOption/getAnswerOptionsByQuestionId";

export default async function getQuestionPublic(id: string): Promise<QuestionPublic> {
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
	const answerOptions = await getAnswerOptionsByQuestionId(question.id);

	// Return the full structure
	return {
		...question,
		answerOptions,
	};
}
