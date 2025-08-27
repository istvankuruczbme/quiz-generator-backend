import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../../types/userTypes";
import updateUser from "../../../services/db/user/updateUser";
import { UpdateUserData } from "../../../utils/db/user/validation/schemas/upadteUserSchema";

export default async function updateUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user, user data and photo URL
	const { user, userData } = res.locals as {
		user: UserSelect;
		userData: UpdateUserData;
	};

	try {
		// Update user personal data in DB
		const updatedUser = await updateUser(user.id, userData);

		// Update user in res.locals
		(res.locals.user as UserSelect) = updatedUser;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
