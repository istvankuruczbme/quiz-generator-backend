import { timestamp } from "drizzle-orm/pg-core";

const updatedAt = timestamp("updated_at")
	.defaultNow()
	.notNull()
	.$onUpdate(() => new Date());
const createdAt = timestamp("created_at").defaultNow().notNull();

export { updatedAt, createdAt };
