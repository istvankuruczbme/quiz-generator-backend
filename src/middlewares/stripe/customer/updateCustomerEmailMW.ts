import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import updateCustomerEmail from "../../../services/stripe/customer/updateCustomerEmail";

export default async function updateCustomerEmailMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };
	// Get new email from req.body
	const { email } = req.body as { email: string };

	try {
		// Update customer email in Stripe
		await updateCustomerEmail(user.customerId ?? "", email);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
