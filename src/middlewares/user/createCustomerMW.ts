import { Request, Response, NextFunction } from "express";
import createCustomer from "../../services/user/createCustomer";

export default async function createCustomerMW(req: Request, res: Response, next: NextFunction) {
	// Get name and email from res.locals
	const { name, email } = req.body as { name: string; email: string };

	try {
		// Create Stripe customer
		const customer = await createCustomer(name, email);

		// Add customer ID to res.locals
		(res.locals.customerId as string) = customer.id;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
