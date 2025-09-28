import { index, pgTable, text, uuid, vector } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { relations, sql, SQL } from "drizzle-orm";
import { QuestionTable } from "./question";
import { createdAt, deletedAt, id, tsvector, updatedAt } from "../schemaHelpers";
import { CompletionTable } from "./completion";
import { CategoryTable } from "./category";
import { QuizConfigTable } from "./quizConfig";

// Schema
export const QuizTable = pgTable(
	"quiz",
	{
		id,
		categoryId: uuid("category")
			.references(() => CategoryTable.id)
			.notNull(),
		title: text("title").notNull(),
		description: text("description").notNull(),
		photoUrl: text("photo_url"),
		embedding: vector("embedding", { dimensions: 1536 }).notNull(),
		search: tsvector("search")
			.notNull()
			.generatedAlwaysAs((): SQL => {
				return sql`setweight(to_tsvector('english', ${QuizTable.title}), 'A') ||
						  setweight(to_tsvector('english',${QuizTable.description}), 'B')`;
			}),
		updatedAt,
		createdAt,
		deletedAt,
		userId: uuid("user_id")
			.references(() => UserTable.id)
			.notNull(),
	},
	(table) => [
		index("embedding_index").using("hnsw", table.embedding.op("vector_cosine_ops")),
		index("search_index").using("gin", table.search),
	]
);

// Relations
export const QuizRelations = relations(QuizTable, ({ one, many }) => {
	return {
		config: one(QuizConfigTable),
		category: one(CategoryTable, {
			fields: [QuizTable.categoryId],
			references: [CategoryTable.id],
		}),
		user: one(UserTable, {
			fields: [QuizTable.userId],
			references: [UserTable.id],
		}),
		questions: many(QuestionTable),
		completions: many(CompletionTable),
	};
});
