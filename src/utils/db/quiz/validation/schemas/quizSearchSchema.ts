import z from "zod/v4";

export const quizSearchSchema = z
	.object({
		searchText: z.string().trim().nonempty("Search text missing."),
		categoryIds: z.array(z.uuid("Invalif category ID.")),
		limit: z.number("Invalid quiz limit.").min(1, "Quiz limit must be min 1."),
	})
	.partial();
export type QuizSearchData = z.infer<typeof quizSearchSchema>;
