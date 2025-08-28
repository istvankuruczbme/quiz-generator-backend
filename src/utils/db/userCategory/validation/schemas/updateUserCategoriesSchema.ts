import z from "zod/v4";

export const updateUserCategoriesSchema = z.object({
	categoryIds: z.array(z.uuid("Invalid category ID.")).min(1, "Min 1 category must be selected."),
});
export type UpdateUserCategoryData = z.infer<typeof updateUserCategoriesSchema>;
