import { asc, eq, sql } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPublic } from "../../../types/questionTypes";
import { AnswerOptionPublic } from "../../../types/answerOptionTypes";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";

export default async function getQuestionsPublicByQuizId(
	quizId: string
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
			answerOptions: sql<
				AnswerOptionPublic[]
			>`array_agg(json_build_object('id', ${AnswerOptionTable.id}, 'text', ${AnswerOptionTable.text}))`,
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
