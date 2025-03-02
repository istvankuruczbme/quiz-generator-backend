import { char, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { QuizTable } from "./quiz";
import { QuizCompletionTable } from "./quizCompletion";
import { UserCategoryTable } from "./userCategory";

// Schema
export const UserTable = pgTable(
	"user",
	{
		id: uuid("id").primaryKey(),
		customerId: char("customer_id", { length: 18 }).notNull(),
		name: text("name").notNull(),
		email: text("email").notNull().unique(),
		photoUrl: text("photo_url"),
		subscriptionId: char("subscription_id", { length: 19 }),
		updatedAt,
		createdAt,
		deletedAt,
	},
	(table) => [uniqueIndex("customer_id_index").on(table.customerId)]
);

// Relations
export const UserRelations = relations(UserTable, ({ many }) => {
	return {
		categories: many(UserCategoryTable),
		quizzes: many(QuizTable),
		completions: many(QuizCompletionTable),
	};
});
