import { relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { QuizTable } from "./quiz";
import { UserCategoryTable } from "./userCategory";

export const categoryNameOptions = [
	"history",
	"geography",
	"science",
	"literature",
	"art",
	"music",
	"movies",
	"sports",
	"technology",
	"politics",
	"food",
	"travel",
	"general knowledge",
] as const;
export const categoryNameEnum = pgEnum("category_name", categoryNameOptions);
export type CategoryName = (typeof categoryNameOptions)[number];

// Schema
export const CategoryTable = pgTable("category", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: categoryNameEnum("name").notNull(),
});

// Relations
export const CategoryRelations = relations(CategoryTable, ({ many }) => {
	return {
		users: many(UserCategoryTable),
		quizzes: many(QuizTable),
	};
});
