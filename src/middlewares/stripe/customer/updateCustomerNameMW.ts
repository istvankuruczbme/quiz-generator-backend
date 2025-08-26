import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import updateCustomerName from "../../../services/stripe/customer/updateCustomerName";

export default async function updateCustomerNameMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };
	// Get user's new name
	const { name } = req.body as { name: string };

	try {
		// Update user name in Stripe
		await updateCustomerName(user.customerId ?? "", name);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
