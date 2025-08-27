import Stripe from "stripe";
import { stripe } from "../../../config/stripe";

export default async function createCustomer(customerData: {
	name: string;
	email: string;
}): Promise<Stripe.Customer> {
	// Create customer
	const customer = await stripe.customers.create(customerData);

	// Return customer
	return customer;
}
