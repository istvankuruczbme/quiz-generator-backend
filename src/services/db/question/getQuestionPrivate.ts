import { and, eq, sql } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuestionPointsTable } from "../../../drizzle/schema/questionPoints";
import { QuestionPrivate } from "../../../types/questionTypes";
import AppError from "../../../classes/AppError";
import { AnswerOptionPrivate } from "../../../types/answerOptionTypes";
import { AnswerOptionTable } from "../../../drizzle/schema/answerOption";

export default async function getQuestionPrivate(
	id: string,
	params: { quizId: string }
): Promise<QuestionPrivate> {
	// Get params
	const { quizId } = params;

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
			answerOptions: sql<
				AnswerOptionPrivate[]
			>`array_agg(json_build_object('id', ${AnswerOptionTable.id}, 'text', ${AnswerOptionTable.text}, 'isCorrect', ${AnswerOptionTable.isCorrect}))`,
		})
		.from(QuestionTable)
		.innerJoin(QuestionPointsTable, eq(QuestionPointsTable.questionId, QuestionTable.id))
		.leftJoin(AnswerOptionTable, eq(AnswerOptionTable.questionId, QuestionTable.id))
		.where(and(eq(QuestionTable.id, id), eq(QuestionTable.quizId, quizId)))
		.groupBy(
			QuestionTable.id,
			QuestionTable.text,
			QuestionTable.photoUrl,
			QuestionTable.order,
			QuestionPointsTable.correct,
			QuestionPointsTable.wrong,
			QuestionPointsTable.empty
		);

	// Check if question exists
	if (!question) throw new AppError({ message: "Question not found.", status: 404 });

	// Return question
	return question;
}
