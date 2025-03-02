import { Request, Response, NextFunction } from "express";
import getUserByCustomerId from "../../services/user/getUserByCustomerId";

export default async function checkExistingUserByCustomerIdMW(
	req: Request,
	_: Response,
	next: NextFunction
) {
	// Get customer ID from request body
	const { customerId } = req.body as { customerId: string };

	try {
		// Get user
		const user = await getUserByCustomerId(customerId);

		// Check if user exists
		if (user == undefined) throw new Error("user/not-found");

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
