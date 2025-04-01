import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { UserTable } from "../../../drizzle/schema/user";

export default async function updateUser(
	id: string,
	newValues: Partial<typeof UserTable.$inferInsert>
): Promise<void> {
	await db.update(UserTable).set(newValues).where(eq(UserTable.id, id));
}
