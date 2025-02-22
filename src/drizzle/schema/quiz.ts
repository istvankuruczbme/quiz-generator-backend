import { index, pgTable, text, uuid, varchar, vector } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";
import { QuestionTable } from "./question";
import { createdAt, deletedAt, id, updatedAt } from "../schemaHelpers";
import { QuizCompletionTable } from "./quizCompletion";

// Schema
export const QuizTable = pgTable(
	"quiz",
	{
		id,
		category: varchar("category", { length: 255 }).notNull(),
		title: text("title").notNull(),
		description: text("description").notNull(),
		photoUrl: text("photo_url"),
		embedding: vector("embedding", { dimensions: 1536 }).notNull(),
		updatedAt,
		createdAt,
		deletedAt,
		userId: uuid("user_id")
			.references(() => UserTable.id)
			.notNull(),
	},
	(table) => [index("embedding_index").using("hnsw", table.embedding.op("vector_cosine_ops"))]
);

// Relations
export const QuizRelations = relations(QuizTable, ({ one, many }) => {
	return {
		user: one(UserTable, {
			fields: [QuizTable.userId],
			references: [UserTable.id],
		}),
		questions: many(QuestionTable),
		completions: many(QuizCompletionTable),
	};
});
