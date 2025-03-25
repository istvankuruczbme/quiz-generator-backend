import { UserTable } from "../drizzle/schema/user";

export type User = typeof UserTable.$inferSelect;

export type UserPublic = Pick<User, "id" | "name" | "photoUrl">;
export type UserProfile = Pick<
	User,
	"id" | "name" | "photoUrl" | "email" | "updatedAt" | "createdAt"
> & {
	hasSubscription: boolean;
};
