import { and, eq, isNull, or } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../../drizzle/schema/quizConfig";
import { QuizSummary } from "../../../types/quizTypes";
import { CategoryTable } from "../../../drizzle/schema/category";
import { UserTable } from "../../../drizzle/schema/user";
import { QuestionTable } from "../../../drizzle/schema/question";
import { QuizCompletionTable } from "../../../drizzle/schema/quizCompletion";
import AppError from "../../../classes/AppError";
import { QUIZ_SUMMARY_COLUMS } from "../../../constants/quiz/quizSummaryColumns";

export default async function getQuizSummary(
	id: string,
	params: { userId: string }
): Promise<QuizSummary> {
	// Extract params
	const { userId } = params;

	// Get quiz summary
	const [quizSummary] = await db
		.select(QUIZ_SUMMARY_COLUMS)
		.from(QuizTable)
		.innerJoin(QuizConfigTable, eq(QuizConfigTable.quizId, QuizTable.id))
		.innerJoin(CategoryTable, eq(QuizTable.categoryId, CategoryTable.id))
		.innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
		.leftJoin(QuestionTable, eq(QuestionTable.quizId, QuizTable.id))
		.leftJoin(QuizCompletionTable, eq(QuizCompletionTable.quizId, QuizTable.id))
		.where(
			and(
				eq(QuizTable.id, id),
				isNull(QuizTable.deletedAt),
				or(
					and(eq(QuizConfigTable.state, "ACTIVE"), eq(QuizConfigTable.visibility, "PUBLIC")),
					eq(QuizTable.userId, userId)
				)
			)
		)
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

	// Check quiz summary
	if (!quizSummary) throw new AppError({ message: "Quiz not found.", status: 404 });

	// Return quiz summary
	return quizSummary;
}
