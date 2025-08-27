import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { UserTable } from "../../../drizzle/schema/user";
import { UserSelect } from "../../../types/userTypes";

export default async function updateUserSubscriptionId(
	userId: string,
	subscriptionId: string | null
): Promise<UserSelect | undefined> {
	const [user] = await db
		.update(UserTable)
		.set({ subscriptionId })
		.where(eq(UserTable.id, userId))
		.returning();
	return user;
}
