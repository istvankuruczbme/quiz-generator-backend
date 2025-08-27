import z from "zod/v4";

export const updateUserSchema = z
	.object({
		name: z.string().trim().nonempty("Name missing."),
		photoUrl: z.union([z.url("Invalid photo URL."), z.null()]),
	})
	.partial();
export type UpdateUserData = z.infer<typeof updateUserSchema>;
