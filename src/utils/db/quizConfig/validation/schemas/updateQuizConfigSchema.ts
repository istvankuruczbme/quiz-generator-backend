import z from "zod/v4";
import { quizConfigVisibilitySchema } from "./quizConfigVisibilitySchema";
import { quizConfigQuestionOrderSchema } from "./quizConfigQuestionOrderSchema";

export const updateQuizConfigSchema = z
	.object({
		visibility: quizConfigVisibilitySchema,
		questionOrder: quizConfigQuestionOrderSchema,
	})
	.partial();
export type UpdateQuizConfigData = z.infer<typeof updateQuizConfigSchema>;
