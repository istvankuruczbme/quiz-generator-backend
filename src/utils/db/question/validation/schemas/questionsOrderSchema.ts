import z from "zod/v4";

export const questionsOrderSchema = z.object({
	questionIds: z.array(z.uuid("Invalid question ID.")),
});
export type QuestionsOrderData = z.infer<typeof questionsOrderSchema>;
