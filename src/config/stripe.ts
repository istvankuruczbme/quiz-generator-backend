import Stripe from "stripe";

// Create instance of Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
