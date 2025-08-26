import AppError from "../../../classes/AppError";
import { db } from "../../../drizzle/db";
import { User } from "../../../types/userTypes";

export default async function getUser(id: string): Promise<User> {
	// Get user
	const user = await db.query.UserTable.findFirst({
		where: (user, { eq }) => eq(user.id, id),
	});

	// Check user
	if (!user) throw new AppError({ message: "User not found.", status: 404 });

	// Return user
	return user;
}
