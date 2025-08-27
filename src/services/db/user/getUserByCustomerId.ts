import { db } from "../../../drizzle/db";
import { UserSelect } from "../../../types/userTypes";

export default async function getUserByCustomerId(id: string): Promise<UserSelect | undefined> {
	// Get user
	const user = await db.query.UserTable.findFirst({
		where: (user, { eq }) => eq(user.customerId, id),
	});

	// Return user
	return user;
}
