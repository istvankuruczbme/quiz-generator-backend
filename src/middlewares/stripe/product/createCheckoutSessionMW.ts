import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import createCheckoutSession from "../../../services/stripe/checkoutSession/createCheckoutSession";
import { UserSelect } from "../../../types/userTypes";
import { CreateCheckoutSessionData } from "../../../utils/stripe/checkoutSession/validation/schemas/createCheckoutSessionSchema";
import AppError from "../../../classes/AppError";

export default async function createCheckoutSessionMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and checkout session data data
	const { user, checkoutSessionData } = res.locals as {
		user: UserSelect;
		checkoutSessionData: CreateCheckoutSessionData;
	};

	try {
		// Check customer ID
		if (!user.customerId) throw new AppError({ message: "Customer ID missing." });

		// Create session
		const session = await createCheckoutSession({
			customerId: user.customerId,
			priceId: checkoutSessionData.priceId,
			successUrl: checkoutSessionData.successUrl,
		});

		// Check session URL
		if (session.url == null) throw new AppError({ message: "Checkout session URL missing." });

		// Add checkout session URL to res.locals
		(res.locals.session as Stripe.Checkout.Session) = session;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
