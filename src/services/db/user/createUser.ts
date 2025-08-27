import { db } from "../../../drizzle/db";
import { UserTable } from "../../../drizzle/schema/user";
import { UserSelect } from "../../../types/userTypes";

export default async function createUser(
	id: string,
	customerId: string,
	name: string,
	email: string,
	photoUrl: string
): Promise<User> {
	// Create user
	const [user] = await db
		.insert(UserTable)
		.values({
			id,
			name,
			email,
			customerId,
			photoUrl: photoUrl || null,
		})
		.returning();

	// Check if user was created
	if (user == undefined) throw new Error("user/not-created");

	// Return user
	return user;
}
