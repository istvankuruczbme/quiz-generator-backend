import { pgEnum, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { QuizTable } from "./quiz";
import { relations } from "drizzle-orm";
import { id } from "../schemaHelpers";

// State
export const quizConfigStateOptions = ["DRAFT", "ACTIVE"] as const;
export const quizConfigStateEnum = pgEnum("quiz_config_state", quizConfigStateOptions);
export type QuizConfigState = (typeof quizConfigStateOptions)[number];

// Visibilty
export const quizConfigVisibilityOptions = ["PUBLIC", "PRIVATE"] as const;
export const quizConfigVisibilityEnum = pgEnum(
	"quiz_config_visibility",
	quizConfigVisibilityOptions
);
export type QuizConfigVisibility = (typeof quizConfigVisibilityOptions)[number];

// Question order
export const quizConfigQuestionOrderOptions = ["NORMAL", "RANDOM"] as const;
export const quizConfigQuestionOrderEnum = pgEnum(
	"quiz_config_question_order",
	quizConfigQuestionOrderOptions
);
export type QuizConfigQuestionOrder = (typeof quizConfigQuestionOrderOptions)[number];

// Schema
export const QuizConfigTable = pgTable(
	"quiz_config",
	{
		id,
		state: quizConfigStateEnum("state").default("DRAFT").notNull(),
		visibility: quizConfigVisibilityEnum("visibility").default("PUBLIC").notNull(),
		questionOrder: quizConfigQuestionOrderEnum("question_order").default("NORMAL").notNull(),
		quizId: uuid("quiz_id")
			.unique()
			.references(() => QuizTable.id, { onDelete: "cascade" })
			.notNull(),
	},
	(table) => [uniqueIndex("quiz_config_quiz_id_index").on(table.quizId)]
);

// Relations
export const QuizConfigRelations = relations(QuizConfigTable, ({ one }) => {
	return {
		quiz: one(QuizTable, {
			fields: [QuizConfigTable.quizId],
			references: [QuizTable.id],
		}),
	};
});
