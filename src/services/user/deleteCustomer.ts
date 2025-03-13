import { stripe } from "../../config/stripe";

export default async function deleteCustomer(id: string): Promise<void> {
	await stripe.customers.del(id);
}
