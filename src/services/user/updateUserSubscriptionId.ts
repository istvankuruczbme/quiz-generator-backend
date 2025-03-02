import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema/user";
import { User } from "../../types/userTypes";

export default async function updateUserSubscriptionId(
	userId: string,
	subscriptionId: string
): Promise<User | undefined> {
	const [user] = await db
		.update(UserTable)
		.set({ subscriptionId })
		.where(eq(UserTable.id, userId))
		.returning();
	return user;
}
