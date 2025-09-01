import { asc, eq, sql } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPrivate } from "../../../types/questionTypes";
import { AnswerOptionPrivate } from "../../../types/answerOptionTypes";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";

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
			answerOptions: sql<
				AnswerOptionPrivate[]
			>`array_agg(json_build_object('id', ${AnswerOptionTable.id}, 'text', ${AnswerOptionTable.text}, 'isCorrect', ${AnswerOptionTable.isCorrect}))`,
		})
		.from(QuestionTable)
		.innerJoin(QuestionPointsTable, eq(QuestionPointsTable.questionId, QuestionTable.id))
		.leftJoin(AnswerOptionTable, eq(AnswerOptionTable.questionId, QuestionTable.id))
		.where(eq(QuestionTable.quizId, quizId))
		.groupBy(
			QuestionTable.id,
			QuestionTable.text,
			QuestionTable.photoUrl,
			QuestionTable.order,
			QuestionPointsTable.correct,
			QuestionPointsTable.wrong,
			QuestionPointsTable.empty
		)
		.orderBy(asc(QuestionTable.order));

	// Return questions
	return questions;
}
