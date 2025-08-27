import { Request, Response, NextFunction } from "express";
import createCustomer from "../../../services/stripe/customer/createCustomer";
import { User as AuthUser } from "@supabase/supabase-js";
import { UserSelect } from "../../../types/userTypes";
import updateUser from "../../../services/db/user/updateUser";

export default async function createCustomerMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user, authUser } = res.locals as { user: UserSelect; authUser: AuthUser };

	// User already has a customer ID
	if (user.customerId) return next();

	try {
		// Create Stripe customer
		const customer = await createCustomer({
			name: authUser.user_metadata.full_name as string,
			email: authUser.email!,
		});

		// Update user in DB
		await updateUser(user.id, { customerId: customer.id });

		// Update user in res.locals
		(res.locals.user as UserSelect) = {
			...user,
			customerId: customer.id,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
