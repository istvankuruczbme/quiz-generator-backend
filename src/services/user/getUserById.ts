import { db } from "../../drizzle/db";
import { User } from "../../types/userTypes";

export default async function getUserById(id: string): Promise<User | undefined> {
	const user = await db.query.UserTable.findFirst({
		where: (user, { eq }) => eq(user.id, id),
	});

	return user;
}
