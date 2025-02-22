import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { QuizTable } from "./quiz";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";
import { QuizCompletionMarkedAnswerOptionTable } from "./quizCompletionMarkedAnswerOption";

// Schema
export const QuizCompletionTable = pgTable("quiz_completion", {
	id,
	updatedAt,
	createdAt,
	quizId: uuid("quiz_id")
		.references(() => QuizTable.id)
		.notNull(),
	userId: uuid("user_id")
		.references(() => UserTable.id)
		.notNull(),
});

// Relations
export const QuizCompletionRelations = relations(QuizCompletionTable, ({ one, many }) => {
	return {
		quiz: one(QuizTable, {
			fields: [QuizCompletionTable.quizId],
			references: [QuizTable.id],
		}),
		user: one(UserTable, {
			fields: [QuizCompletionTable.userId],
			references: [UserTable.id],
		}),
		markedAnswerOptions: many(QuizCompletionMarkedAnswerOptionTable),
	};
});
