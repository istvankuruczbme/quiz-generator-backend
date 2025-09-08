import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { QuestionTable } from "./question";
import { relations } from "drizzle-orm";
import { id } from "../schemaHelpers";

// Schema
export const AnswerOptionTable = pgTable("answer_option", {
	id,
	text: text("text").notNull(),
	isCorrect: boolean("is_correct").notNull(),
	questionId: uuid("question_id")
		.references(() => QuestionTable.id, { onDelete: "cascade" })
		.notNull(),
});

// Relations
export const AnswerOptionRelations = relations(AnswerOptionTable, ({ one, many }) => {
	return {
		question: one(QuestionTable, {
			fields: [AnswerOptionTable.questionId],
			references: [QuestionTable.id],
		}),
	};
});
