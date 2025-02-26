import { integer, pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { QuizTable } from "./quiz";
import { relations } from "drizzle-orm";
import { id } from "../schemaHelpers";

// Visibilty
export const quizConfigVisibilityOptions = ["PUBLIC", "PRIVATE"] as const;
export const quizConfigVisibilityEnum = pgEnum(
	"quiz_config_visibility",
	quizConfigVisibilityOptions
);
export type QuizConfigVisibility = (typeof quizConfigVisibilityOptions)[number];

// Question order
export const quizConfigQuestionOrderOptions = ["NORMAL", "RANDOM"] as const;
const quizConfigQuestionOrderEnum = pgEnum(
	"quiz_config_question_order",
	quizConfigQuestionOrderOptions
);
export type QuizConfigQuestionOrder = (typeof quizConfigQuestionOrderOptions)[number];

// Schema
export const QuizConfigTable = pgTable("quiz_config", {
	id,
	visibility: quizConfigVisibilityEnum("visibility").default("PUBLIC").notNull(),
	maxQuestionCount: integer("max_question_count").notNull(),
	questionOrder: quizConfigQuestionOrderEnum("question_order").default("NORMAL").notNull(),
	quizId: uuid("quiz_id")
		.references(() => QuizTable.id, { onDelete: "cascade" })
		.notNull(),
});

// Relations
export const QuizConfigRelations = relations(QuizConfigTable, ({ one }) => {
	return {
		quiz: one(QuizTable, {
			fields: [QuizConfigTable.quizId],
			references: [QuizTable.id],
		}),
	};
});
