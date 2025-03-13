import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema/user";

export default async function deleteUser(id: string): Promise<void> {
	await db
		.update(UserTable)
		.set({
			customerId: "cus_00000000000000",
			name: "Deleted user",
			email: "deleted_user@email.com",
			photoUrl: null,
			deletedAt: new Date(),
		})
		.where(eq(UserTable.id, id));
}
