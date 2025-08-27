import { UserTable } from "../drizzle/schema/user";

//#region User DB types
export type UserSelect = typeof UserTable.$inferSelect;
export type UserInsert = typeof UserTable.$inferSelect;
export type UserUpdate = Partial<
	Pick<UserSelect, "name" | "photoUrl" | "customerId" | "updatedAt" | "deletedAt">
>;
// #endregion

// #region User types
export type UserWithCustomerId = Omit<UserSelect, "customerId"> & { customerId: string };

export type UserPublic = Pick<UserSelect, "id" | "name" | "photoUrl">;
export type UserProfile = Pick<
	UserSelect,
	"id" | "name" | "photoUrl" | "updatedAt" | "createdAt"
> & {
	hasSubscription: boolean;
};
// #endregion
