import { db } from "../../../drizzle/db";
import { User } from "../../../types/userTypes";

export default async function getUser(id: string): Promise<User> {
	// Get user
	const user = await db.query.UserTable.findFirst({
		where: (user, { eq }) => eq(user.id, id),
	});

	// Check if user exists
	if (user == undefined) throw new Error("user/not-found");

	// Return user
	return user;
}
