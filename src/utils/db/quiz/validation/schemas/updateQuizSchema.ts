import z from "zod/v4";

export const updateQuizSchema = z
	.object({
		title: z.string().trim().nonempty("Title missing."),
		description: z.string().trim().nonempty("Description missing."),
		photoUrl: z.union([z.url("Invalid photo URL."), z.null()]),
		categoryId: z.uuid("Invalid category."),
	})
	.partial();
export type UpdateQuizData = z.infer<typeof updateQuizSchema>;
