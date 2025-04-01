import { asc, eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPrivate } from "../../../types/questionTypes";
import getAnswerOptionsByQuestionId from "../answerOption/getAnswerOptionsByQuestionId";
import { AnswerOptionPrivate } from "../../../types/answerOptionTypes";

export default async function getQuestionsByQuizId(quizId: string): Promise<QuestionPrivate[]> {
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
		.where(eq(QuestionTable.quizId, quizId))
		.orderBy(asc(QuestionTable.order));

	// Get answer options
	const answerOptions = await Promise.all(
		questions.map(async (question) => await getAnswerOptionsByQuestionId(question.id, false))
	);

	// Return the full structure
	return questions.map((question, i) => ({
		...question,
		answerOptions: (answerOptions[i] || []) as AnswerOptionPrivate[],
	}));
}
