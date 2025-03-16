import { stripe } from "../../../config/stripe";

export default async function updateCustomerEmail(
	customerId: string,
	email: string
): Promise<void> {
	await stripe.customers.update(customerId, { email });
}
