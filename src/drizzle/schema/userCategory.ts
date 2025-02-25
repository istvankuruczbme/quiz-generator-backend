import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { CategoryTable } from "./category";
import { relations } from "drizzle-orm";

// Schema
export const UserCategoryTable = pgTable(
	"user_category",
	{
		userId: uuid("user_id")
			.references(() => UserTable.id)
			.notNull(),
		categoryId: uuid("category_id")
			.references(() => CategoryTable.id)
			.notNull(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.categoryId] })]
);

// Relations
export const UserCategoryRelations = relations(UserCategoryTable, ({ one }) => {
	return {
		user: one(UserTable, {
			fields: [UserCategoryTable.userId],
			references: [UserTable.id],
		}),
		category: one(CategoryTable, {
			fields: [UserCategoryTable.categoryId],
			references: [CategoryTable.id],
		}),
	};
});
