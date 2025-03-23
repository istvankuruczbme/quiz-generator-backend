import { Request, Response, NextFunction } from "express";
import createCustomer from "../../../services/stripe/customer/createCustomer";
import { User } from "@supabase/supabase-js";

export default async function createCustomerMW(_: Request, res: Response, next: NextFunction) {
	// Get authenticated user from res.locals
	const { authUser } = res.locals as { authUser: User };

	try {
		// Create Stripe customer
		const customer = await createCustomer(
			authUser.user_metadata.name as string,
			authUser.email as string
		);

		// Add customer ID to res.locals
		(res.locals.customerId as string) = customer.id;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
