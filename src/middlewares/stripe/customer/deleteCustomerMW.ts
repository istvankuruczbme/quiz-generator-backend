import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import deleteCustomer from "../../../services/stripe/customer/deleteCustomer";

export default async function deleteCustomerMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	try {
		// Delete customer from Stripe
		await deleteCustomer(user.customerId ?? "");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
