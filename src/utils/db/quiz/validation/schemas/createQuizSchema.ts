import z from "zod/v4";

export const createQuizSchema = z.object({
	title: z.string().trim().nonempty("Title missing."),
	description: z.string().trim().nonempty("Description missing."),
	categoryId: z.uuid("Invalid category."),
});
export type CreateQuizData = z.infer<typeof createQuizSchema> & { photoUrl?: string };
