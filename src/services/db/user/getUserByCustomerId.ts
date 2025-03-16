import { db } from "../../../drizzle/db";
import { User } from "../../../types/userTypes";

export default async function getUserByCustomerId(id: string): Promise<User | undefined> {
	const user = await db.query.UserTable.findFirst({
		where: (user, { eq }) => eq(user.customerId, id),
	});
	return user;
}
