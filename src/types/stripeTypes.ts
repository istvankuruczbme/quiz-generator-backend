import Stripe from "stripe";

export type ProductWithPrice = Stripe.Product & {
	default_price: Stripe.Price;
};
