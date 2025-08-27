import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import deleteCustomer from "../../../services/stripe/customer/deleteCustomer";

export default async function deleteCustomerMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	// Check customer ID
	if (!user.customerId) return next();

	try {
		// Delete customer from Stripe
		await deleteCustomer(user.customerId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
