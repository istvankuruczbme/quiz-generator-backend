import { and, eq, isNull } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { CategoryTable } from "../../../drizzle/schema/category";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { UserTable } from "../../../drizzle/schema/user";
import { QuizSummary } from "../../../types/quizTypes";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuizCompletionTable } from "../../../drizzle/schema/quizCompletion";
import { QUIZ_SUMMARY_COLUMS } from "../../../constants/quiz/quizSummaryColumns";

export default async function getQuizSummariesByUserId(userId: string): Promise<QuizSummary[]> {
	// Get quiz summaries
	const quizSummaries = await db
		.select(QUIZ_SUMMARY_COLUMS)
		.from(QuizTable)
		.innerJoin(QuizConfigTable, eq(QuizConfigTable.quizId, QuizTable.id))
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.leftJoin(QuestionTable, eq(QuestionTable.quizId, QuizTable.id))
		.leftJoin(QuizCompletionTable, eq(QuizCompletionTable.quizId, QuizTable.id))
		.where(and(eq(QuizTable.userId, userId), isNull(QuizTable.deletedAt)))
		.groupBy(
			QuizTable.id,
			CategoryTable.id,
			CategoryTable.name,
			QuizTable.title,
			QuizTable.description,
			QuizTable.photoUrl,
			QuizTable.embedding,
			QuizTable.updatedAt,
			QuizTable.createdAt,
			QuizConfigTable.state,
			QuizConfigTable.visibility,
			QuizConfigTable.questionOrder,
			UserTable.id,
			UserTable.name,
			UserTable.photoUrl
		);

	// Return quiz summaries
	return quizSummaries;

	// // Get quiz summaries
	// const quizDatas = await getQuizDatasByUserId(userId);

	// // Get question count and completion count of quizzes
	// const questionCounts = await Promise.all(
	// 	quizDatas.map(async (quiz) => await getQuestionCountByQuizId(quiz.id))
	// );
	// const completionCounts = await Promise.all(
	// 	quizDatas.map(async (quiz) => await getQuizCompletionCountByQuizId(quiz.id))
	// );

	// // Return quizzes
	// return quizDatas.map((quizData, i) => ({
	// 	...quizData,
	// 	questionCount: questionCounts[i] || 0,
	// 	completionCount: completionCounts[i] || 0,
	// }));
}
