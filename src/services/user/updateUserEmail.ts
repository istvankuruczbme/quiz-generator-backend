import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema/user";

export default async function updateUserEmail(id: string, email: string): Promise<void> {
	await db.update(UserTable).set({ email }).where(eq(UserTable.id, id));
}
