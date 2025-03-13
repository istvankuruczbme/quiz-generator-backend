import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import createCustomerPortalSession from "../../services/user/createCustomerPortalSession";
import Stripe from "stripe";

export default async function createCustomerPortalSessionMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	try {
		// Create customer portal session
		const session = await createCustomerPortalSession(user.customerId);

		// Add session to res.locals
		(res.locals.session as Stripe.BillingPortal.Session) = session;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
