import { Request, Response, NextFunction } from "express";
import { User } from "../../../types/userTypes";
import updateUser from "../../../services/db/user/updateUser";

export default async function deleteUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	try {
		// Delete user
		await updateUser(user.id, {
			customerId: "cus_00000000000000",
			deletedAt: new Date(),
		});

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
