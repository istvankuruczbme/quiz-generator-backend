import { stripe } from "../../../config/stripe";

export default async function updateCustomerName(customerId: string, name: string): Promise<void> {
	await stripe.customers.update(customerId, { name });
}
