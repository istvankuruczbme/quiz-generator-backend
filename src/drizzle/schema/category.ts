import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { QuizTable } from "./quiz";
import { UserCategoryTable } from "./userCategory";

export const categoryNameOptions = [
	"History",
	"Geography",
	"Science",
	"Literature",
	"Art",
	"Music",
	"Movies",
	"Sports",
	"Technology",
	"Politics",
	"Food",
	"Travel",
	"General Knowledge",
] as const;
export const categoryNameEnum = pgEnum("category_name", categoryNameOptions);
export type CategoryName = (typeof categoryNameOptions)[number];

// Schema
export const CategoryTable = pgTable("category", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
});

// Relations
export const CategoryRelations = relations(CategoryTable, ({ many }) => {
	return {
		users: many(UserCategoryTable),
		quizzes: many(QuizTable),
	};
});
