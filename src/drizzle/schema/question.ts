import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { QuizTable } from "./quiz";
import { relations } from "drizzle-orm";
import { QuestionPointsTable } from "./questionPoints";
import { AnswerOptionTable } from "./answerOption";
import { id } from "../schemaHelpers";

// Schema
export const QuestionTable = pgTable("question", {
	id,
	text: text("text").notNull(),
	photoUrl: text("photo_url"),
	order: integer("order").notNull(),
	quizId: uuid("quiz_id")
		.references(() => QuizTable.id, { onDelete: "cascade" })
		.notNull(),
});

// Relations
export const QuestionRelations = relations(QuestionTable, ({ one, many }) => {
	return {
		quiz: one(QuizTable, {
			fields: [QuestionTable.quizId],
			references: [QuizTable.id],
		}),
		points: one(QuestionPointsTable),
		answerOptions: many(AnswerOptionTable),
	};
});
