import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import updateCustomerName from "../../../services/stripe/customer/updateCustomerName";
import { UpdateUserData } from "../../../utils/db/user/validation/schemas/upadteUserSchema";

export default async function updateCustomerNameMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and user data
	const {
		user,
		userData: { name },
	} = res.locals as { user: UserSelect; userData: UpdateUserData };

	// Check customer ID and new name
	if (!user.customerId || !name) return next();

	try {
		// Update user name in Stripe
		await updateCustomerName(user.customerId, name);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
