import { pgTable, real, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { QuestionTable } from "./question";
import { relations } from "drizzle-orm";
import { id } from "../schemaHelpers";

// Schema
export const QuestionPointsTable = pgTable(
	"question_points",
	{
		id,
		correct: real("correct").notNull(),
		wrong: real("wrong").notNull(),
		empty: real("empty").notNull(),
		questionId: uuid("question_id")
			.unique()
			.references(() => QuestionTable.id, { onDelete: "cascade" })
			.notNull(),
	},
	(table) => [uniqueIndex("question_points_question_id_index").on(table.questionId)]
);

// Relations
export const questionPointsRelations = relations(QuestionPointsTable, ({ one }) => {
	return {
		question: one(QuestionTable, {
			fields: [QuestionPointsTable.questionId],
			references: [QuestionTable.id],
		}),
	};
});
