import { timestamp, uuid } from "drizzle-orm/pg-core";

// Ids
const id = uuid("id").defaultRandom().primaryKey();

// Timestamps
const updatedAt = timestamp("updated_at")
	.defaultNow()
	.notNull()
	.$onUpdate(() => new Date());
const createdAt = timestamp("created_at").defaultNow().notNull();
const deletedAt = timestamp("deleted_at");

export { id, updatedAt, createdAt, deletedAt };
