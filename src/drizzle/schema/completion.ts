import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { QuizTable } from "./quiz";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";
import { CompletionQuestionTable } from "./completionQuestion";

// Schema
export const CompletionTable = pgTable("completion", {
	id,
	updatedAt,
	createdAt,
	finishedAt: timestamp("finished_at"),
	quizId: uuid("quiz_id")
		.references(() => QuizTable.id)
		.notNull(),
	userId: uuid("user_id")
		.references(() => UserTable.id)
		.notNull(),
});

// Relations
export const CompletionRelations = relations(CompletionTable, ({ one, many }) => {
	return {
		quiz: one(QuizTable, {
			fields: [CompletionTable.quizId],
			references: [QuizTable.id],
		}),
		user: one(UserTable, {
			fields: [CompletionTable.userId],
			references: [UserTable.id],
		}),
		questions: many(CompletionQuestionTable),
	};
});
