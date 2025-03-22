import { Request, Response, NextFunction } from "express";
import deleteUserPhoto from "../../../services/db/user/deleteUserPhoto";
import { User } from "../../../types/userTypes";

export default async function deleteUserPhotoMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	try {
		// Delete user photo
		await deleteUserPhoto(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
