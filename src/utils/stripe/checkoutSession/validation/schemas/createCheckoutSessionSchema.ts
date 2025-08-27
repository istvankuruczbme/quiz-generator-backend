import z from "zod";

export const createCheckoutSessionSchema = z.object({
	priceId: z.string().startsWith("price_", "Invalid price ID."),
	successUrl: z.string().trim().nonempty("Success URL missing.").optional(),
});
export type CreateCheckoutSessionData = z.infer<typeof createCheckoutSessionSchema>;
