import { db } from "../../../drizzle/db";
import { UserTable } from "../../../drizzle/schema/user";
import { User } from "../../../types/userTypes";

export default async function createUser(
	id: string,
	customerId: string,
	name: string,
	email: string,
	photoUrl: string | null
): Promise<User | undefined> {
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

	return user;
}
