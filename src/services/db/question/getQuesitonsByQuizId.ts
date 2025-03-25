import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPublic } from "../../../types/questionTypes";
import getAnswerOptionsByQuestionId from "../answerOption/getAnswerOptionsByQuestionId";

export default async function getQuesitonsByQuizId(
	quizId: string,
	isPrivate = false
): Promise<QuestionPublic[]> {
	// Get questions
	const questions = await db
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
		.where(eq(QuestionTable.quizId, quizId));

	// Get answer options
	const answerOptions = await Promise.all(
		questions.map(async (question) => await getAnswerOptionsByQuestionId(question.id, isPrivate))
	);

	// Return the full structure
	return questions.map((question, i) => ({
		...question,
		answerOptions: answerOptions[i] || [],
	}));
}
