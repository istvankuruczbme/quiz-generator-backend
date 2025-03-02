import Stripe from "stripe";
import { stripe } from "../../config/stripe";

export default async function createCustomer(
	name: string,
	email: string
): Promise<Stripe.Customer> {
	const customer = await stripe.customers.create({
		name,
		email,
	});

	return customer;
}
