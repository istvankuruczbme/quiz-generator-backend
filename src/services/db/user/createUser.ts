import { db } from "../../../drizzle/db";
import { UserTable } from "../../../drizzle/schema/user";
import { User } from "../../../types/userTypes";

export default async function createUser(
	id: string,
	customerId: string,
	name: string,
	email: string,
	photoUrl: string | null
): Promise<User> {
	// Create user
	const [user] = await db
		.insert(UserTable)
		.values({
			id,
			name,
			email,
			customerId,
			photoUrl,
		})
		.returning();

	// Check if user was created
	if (user == undefined) throw new Error("user/not-created");

	// Return user
	return user;
}
