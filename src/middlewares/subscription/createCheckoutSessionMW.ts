import { Request, Response, NextFunction } from "express";
import createCheckoutSession from "../../services/subscription/createCheckoutSession";
import Stripe from "stripe";

export default async function createCheckoutSessionMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get customer ID and price ID from request
	const { customerId, priceId, successUrl } = req.body as {
		customerId: string;
		priceId: string;
		successUrl?: string;
	};

	try {
		// Create session
		const session = await createCheckoutSession(customerId, priceId, successUrl);

		// Check session URL
		if (session.url == null) throw new Error("checkout/url-missing");

		// Add session URL to res.locals
		(res.locals.session as Stripe.Checkout.Session) = session;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
