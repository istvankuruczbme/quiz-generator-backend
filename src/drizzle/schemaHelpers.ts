import { customType, timestamp, uuid } from "drizzle-orm/pg-core";

// Id
const id = uuid("id").defaultRandom().primaryKey();

// Text search
export const tsvector = customType<{
	data: string;
}>({
	dataType() {
		return `tsvector`;
	},
});

// Timestamps
const updatedAt = timestamp("updated_at")
	.defaultNow()
	.notNull()
	.$onUpdate(() => new Date());
const createdAt = timestamp("created_at").defaultNow().notNull();
const deletedAt = timestamp("deleted_at");

export { id, updatedAt, createdAt, deletedAt };
