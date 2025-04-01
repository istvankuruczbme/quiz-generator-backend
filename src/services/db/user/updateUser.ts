import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { UserTable } from "../../../drizzle/schema/user";
import { UserUpdatableProperties } from "../../../types/userTypes";

export default async function updateUser(
	id: string,
	newValues: UserUpdatableProperties
): Promise<void> {
	await db.update(UserTable).set(newValues).where(eq(UserTable.id, id));
}
