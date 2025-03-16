import { stripe } from "../../../config/stripe";
import Stripe from "stripe";

export default async function getPricebyId(id: string): Promise<Stripe.Price> {
	const price = await stripe.prices.retrieve(id);
	return price;
}
