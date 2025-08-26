import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import createCheckoutSession from "../../../services/stripe/checkoutSession/createCheckoutSession";
import { User } from "../../../types/userTypes";

export default async function createCheckoutSessionMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	// Get customer ID and price ID from request
	const { priceId, successUrl } = req.body as {
		priceId: string;
		successUrl?: string;
	};

	try {
		// Create session
		const session = await createCheckoutSession(user.customerId ?? "", priceId, successUrl);

		// Check session URL
		if (session.url == null) throw new Error("checkout-session/url-missing");

		// Add session URL to res.locals
		(res.locals.session as Stripe.Checkout.Session) = session;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
