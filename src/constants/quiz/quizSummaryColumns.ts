import { sql } from "drizzle-orm";
import { CategoryTable } from "../../drizzle/schema/category";
import { QuestionTable } from "../../drizzle/schema/question";
import { QuizTable } from "../../drizzle/schema/quiz";
import { QuizConfigTable } from "../../drizzle/schema/quizConfig";
import { UserTable } from "../../drizzle/schema/user";
import { CompletionTable } from "../../drizzle/schema/completion";

export const QUIZ_SUMMARY_COLUMS = {
	id: QuizTable.id,
	category: {
		id: CategoryTable.id,
		name: CategoryTable.name,
	},
	title: QuizTable.title,
	description: QuizTable.description,
	photoUrl: QuizTable.photoUrl,
	embedding: QuizTable.embedding,
	updatedAt: QuizTable.updatedAt,
	createdAt: QuizTable.createdAt,
	config: {
		state: QuizConfigTable.state,
		visibility: QuizConfigTable.visibility,
		questionOrder: QuizConfigTable.questionOrder,
	},
	user: {
		id: UserTable.id,
		name: UserTable.name,
		photoUrl: UserTable.photoUrl,
	},
	questionCount: sql<number>`COUNT(${QuestionTable.id})::int`,
	completionCount: sql<number>`COUNT(DISTINCT ${CompletionTable.id})::int`,
} as const;
