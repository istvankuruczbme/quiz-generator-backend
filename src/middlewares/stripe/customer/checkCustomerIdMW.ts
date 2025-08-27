import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import AppError from "../../../classes/AppError";

export default function checkCustomerIdMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };

	try {
		// Check customer ID
		if (!user.customerId) throw new AppError({ message: "Customer ID missing." });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
