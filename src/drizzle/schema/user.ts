import { char, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { QuizTable } from "./quiz";
import { QuizCompletionTable } from "./quizCompletion";

// Schema
export const UserTable = pgTable(
	"user",
	{
		id,
		firebaseId: char("firebase_id", { length: 28 }).notNull(),
		customerId: char("customer_id", { length: 18 }).notNull(),
		name: text("name").notNull(),
		email: text("email").notNull().unique(),
		photoUrl: text("photo_url"),
		updatedAt,
		createdAt,
		deletedAt,
	},
	(table) => [
		uniqueIndex("firebase_id_index").on(table.firebaseId),
		uniqueIndex("customer_id_index").on(table.customerId),
	]
);

// Relations
export const UserRelations = relations(UserTable, ({ many }) => {
	return {
		quizzes: many(QuizTable),
		completions: many(QuizCompletionTable),
	};
});
