import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema/user";

export default async function upadteUserPersonalData(
	id: string,
	name: string,
	email: string,
	photoUrl: string | null
): Promise<void> {
	// No photo URL
	if (photoUrl == null) {
		await db.update(UserTable).set({ name, email }).where(eq(UserTable.id, id));
	} else {
		await db.update(UserTable).set({ name, email, photoUrl }).where(eq(UserTable.id, id));
	}
}
