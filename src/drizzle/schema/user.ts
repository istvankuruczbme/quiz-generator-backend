import { char, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";

// Schema
export const userTable = pgTable(
	"user",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		firebaseId: char("firebase_id", { length: 28 }).notNull(),
		customerId: char("customer_id", { length: 18 }).notNull(),
		name: text("name").notNull(),
		email: text("email").notNull().unique(),
		photoUrl: text("photo_url"),
		updatedAt,
		createdAt,
	},
	(table) => [uniqueIndex("firebase_id_index").on(table.firebaseId)]
);

// Relations
