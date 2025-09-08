import { check, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers";
import { QuestionTable } from "./question";
import { relations, sql } from "drizzle-orm";
import { CompletionTable } from "./completion";

// Schema
export const CompletionQuestionTable = pgTable(
	"completion_question",
	{
		questionId: uuid("question_id")
			.references(() => QuestionTable.id)
			.primaryKey(),
		selectedAnswerOptionIds: uuid("selected_answer_option_ids").array().notNull(),
		answeredAt: timestamp("answered_at").notNull().defaultNow(),
		completionId: uuid("completion_id")
			.references(() => CompletionTable.id)
			.notNull(),
	},
	(table) => [
		check(
			"selected_answer_option_ids_nonempty",
			sql`array_length(${table.selectedAnswerOptionIds}, 1) > 0`
		),
	]
);

// Relations
export const CompletionQuestionRelations = relations(CompletionQuestionTable, ({ one }) => {
	return {
		question: one(QuestionTable, {
			fields: [CompletionQuestionTable.questionId],
			references: [QuestionTable.id],
		}),
		completion: one(CompletionTable, {
			fields: [CompletionQuestionTable.completionId],
			references: [CompletionTable.id],
		}),
	};
});
