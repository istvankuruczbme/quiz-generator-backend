import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { UserSelect } from "../../../types/userTypes";
import createCustomerPortalSession from "../../../services/stripe/customer/createCustomerPortalSession";
import AppError from "../../../classes/AppError";

export default async function createCustomerPortalSessionMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	try {
		// Check customer ID
		if (!user.customerId) throw new AppError({ message: "Customer ID missing." });

		// Create customer portal session
		const session = await createCustomerPortalSession({ customerId: user.customerId });

		// Add session to res.locals
		(res.locals.session as Stripe.BillingPortal.Session) = session;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
