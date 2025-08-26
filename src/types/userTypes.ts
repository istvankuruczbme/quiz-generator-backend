import { UserTable } from "../drizzle/schema/user";

// DB select
export type User = typeof UserTable.$inferSelect;

// DB insert
export type UserUpdatableProperties = Partial<
	Pick<User, "name" | "photoUrl" | "customerId" | "updatedAt" | "deletedAt">
>;

export type UserPublic = Pick<User, "id" | "name" | "photoUrl">;
export type UserProfile = Pick<User, "id" | "name" | "photoUrl" | "updatedAt" | "createdAt"> & {
	hasSubscription: boolean;
};
